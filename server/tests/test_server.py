import unittest
from unittest import TestCase
from unittest.mock import patch
from app import app


class TestOccupationsRoute(TestCase):
    def setUp(self):
        self.client = app.test_client()

    @patch('app.Occupation.count_documents')
    def test_get_occupations_count(self, mock_count_documents):
        mock_count_documents.return_value = 10

        response = self.client.get('/api/occupations/count')
        data = response.get_json()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data, 10)

    def tearDown(self):
        pass


if __name__ == '__main__':
    unittest.main()
