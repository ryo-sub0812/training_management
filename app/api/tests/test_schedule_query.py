import json
import datetime

from django.utils import timezone

from graphene_django.utils.testing import GraphQLTestCase

from api.utils.factory import UserFactory, TeamFactory, TrainingFactory, ScheduleFactory
from api.utils.test_helper import create_token_headers
from api.utils.test_query import GET_MY_TEAM_SCHEDULES

class ScheduleQueryTestCase(GraphQLTestCase):
    @classmethod
    def setUpTestData(self):
        self.first_team = TeamFactory(
            name="first team",
            password="0000",
            team_board__coach="first coach user",
            team_board__join_count=2,
        )
        self.second_team = TeamFactory(
            name="second team",
            password="0000",
            team_board__coach="second coach user",
            team_board__join_count=1,
        )
        self.first_coach = UserFactory(
            profile__is_coach=True,
            profile__nickname="first coach user",
            profile__team_board=self.first_team.team_board
        )
        self.second_coach = UserFactory(
            profile__is_coach=True,
            profile__nickname="second coach user",
            profile__team_board=self.second_team.team_board
        )
        self.first_team_training = TrainingFactory(
            title="first training",
            team_board=self.first_team.team_board
        )
        self.second_team_training = TrainingFactory(
            title="second training",
            team_board=self.second_team.team_board
        )
        for i in range(5):
            ScheduleFactory(
                training=self.first_team_training,
                team_board=self.first_team.team_board,
                date=timezone.localtime(timezone.now()).date() + datetime.timedelta(days=i)
            )
        for i in range(5):
            ScheduleFactory(
                training=self.second_team_training,
                team_board=self.second_team.team_board,
                date=timezone.localtime(timezone.now()).date() + datetime.timedelta(days=i)
            )

    def test_success_get_my_team_schedules(self):
        response = self.query(
            GET_MY_TEAM_SCHEDULES,
            op_name="myTeamSchedules",
            headers=create_token_headers(self.first_coach)
        )
        content = json.loads(response.content)
        self.assertResponseNoErrors(response)
        self.assertEqual(len(content["data"]["myTeamSchedules"]["edges"]), 5)

    def test_failed_get_my_team_schedules_because_not_login(self):
        response = self.query(
            GET_MY_TEAM_SCHEDULES,
            op_name="myTeamSchedules"
        )
        content = json.loads(response.content)
        self.assertEqual(content['errors'][0]['message'], 'You do not have permission to perform this action')