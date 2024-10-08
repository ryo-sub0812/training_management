import graphene

from django.utils import timezone

from graphql import GraphQLError
from graphene import relay
from graphql_jwt.decorators import login_required, user_passes_test
from graphql_relay import from_global_id

from api.models import Profile, Schedule, FinishedSchedule
from api.graphql.node import FinishedScheduleNode

class CreateFinishedScheduleMutation(relay.ClientIDMutation):
    class Input:
        schedule_id = graphene.ID(required=True)
        count = graphene.Int(required=True)
        load = graphene.Int(required=True)
        distance = graphene.Int(required=True)
        minitus = graphene.Int(required=True)
        comment = graphene.String() 

    finished_schedule = graphene.Field(FinishedScheduleNode)

    @login_required
    @user_passes_test(lambda use: not use.profile.is_guest)
    def mutate_and_get_payload(root, info, **input):
        schedule = Schedule.objects.get(id=from_global_id(input.get('schedule_id'))[1])
        training = schedule.training
        if schedule.team_board != info.context.user.profile.team_board:
            raise GraphQLError("Cannot finish other team schedule")
        if FinishedSchedule.objects.filter(schedule=schedule, profile=info.context.user.profile).exists():
            raise GraphQLError("Schedule is already finished")
        if schedule.date != timezone.localtime(timezone.now()).date():
            raise GraphQLError("Cannot finish any schedule other than today")
        if '1' in training.finished_patern and input.get('count') == 0:
            raise GraphQLError('Count is required')
        if '2' in training.finished_patern and input.get('load') == 0:
            raise GraphQLError('Load is required')
        if '3' in training.finished_patern and input.get('distance') == 0:
            raise GraphQLError('Distance is required')
        if '4' in training.finished_patern and input.get('minitus') == 0:
            raise GraphQLError('Minitus is required')
        finished_schedule = FinishedSchedule(
            schedule=schedule,
            training=training,
            load=input.get('load'),
            count=input.get('count'),
            distance=input.get('distance'),
            minitus=input.get('minitus'),
            comment=input.get('comment'),
            profile=info.context.user.profile,
        )
        finished_schedule.save()
        schedule.finished_count += 1
        schedule.save()
        profile = info.context.user.profile
        profile.finished_schedule_count += 1
        profile.save()

        return CreateFinishedScheduleMutation(finished_schedule=finished_schedule)

class DeleteFinishedScheduleMutation(relay.ClientIDMutation):
    class Input:
        schedule_id = graphene.ID(required=True)

    finished_schedule = graphene.Field(FinishedScheduleNode)

    @login_required
    def mutate_and_get_payload(root, info, **input):
        schedule = Schedule.objects.get(id=from_global_id(input.get('schedule_id'))[1])
        if not FinishedSchedule.objects.filter(schedule=schedule, profile=info.context.user.profile).exists():
            raise GraphQLError("Schedule is not finished")
        if schedule.date != timezone.localtime(timezone.now()).date():
            raise GraphQLError("Cannot delete finish schedule other than today")
        finished_schedule = FinishedSchedule.objects.get(
            schedule=schedule,
            profile=info.context.user.profile
        )
        finished_schedule.delete()
        schedule.finished_count -= 1
        schedule.save()
        profile = Profile.objects.get(id=info.context.user.profile.id)
        profile.finished_schedule_count -= 1
        profile.save()

        return DeleteFinishedScheduleMutation(finished_schedule=None)