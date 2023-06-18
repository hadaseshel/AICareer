import unittest
from unittest import TestCase
import requests
import unittest


class TestServer(TestCase):
    def setUp(self):
        self.url = "http://localhost:4000/api"
               
    #################################### Tests for Occupation functions ####################################
        
    def test_get_occupations_by_code(self):
        code = "45-2021.00"
        occupations = "/occupations"
        url = f"{self.url +occupations}/Code/?Code={code}"
        
        response = requests.get(url) # Send a GET request to the server
        data = response.json() # Extract the JSON data from the response
        
        self.assertEqual(response.status_code, 200) # Assert if the response status code is not 200
        self.assertEqual(data["Code"], code)
    
    #######################################################################################################
    
    ####################################### Tests for Home functions #######################################
    def test_get_app_description(self):
        url_desc = "/home"
        full_url = self.url + url_desc
        body = {"section": "description"}
        title = "What is AIcareer?"
        
        response = requests.get(full_url, params=body) # Send a GET request to the server
        data = response.json() # Extract the JSON data from the response
        
        self.assertEqual(response.status_code, 200) # Assert if the response status code is not 200
        self.assertEqual(data["title"], title)

    def test_get_market_status(self):
        url_desc = "/home"
        full_url = self.url + url_desc
        body = {"section": "market status"}
        title = "Career market status"
        
        response = requests.get(full_url, params=body) # Send a GET request to the server
        data = response.json() # Extract the JSON data from the response
        
        self.assertEqual(response.status_code, 200) # Assert if the response status code is not 200
        self.assertEqual(data["title"], title)
    
    #######################################################################################################
    
    ###################################### Tests for Recommend functions ###################################
    
    def test_get_user_result(self):
        url_login = "/recommend/result"
        full_url = self.url + url_login
        user_id = "64870447eeb503c2350f9b98" # put correct user id
        body = {"user_id": user_id}
        user_result = ["Passenger Attendants", 
                       "Receptionists and Information Clerks",
                       "Magnetic Resonance Imaging Technologists",
                       "Forest Fire Inspectors and Prevention Specialists",
                       "Exercise Trainers and Group Fitness Instructors"] # put correct response
        
        response = requests.get(full_url, params=body) # Send a GET request to the server
        data = response.json()  # Extract the JSON data from the response
        
        self.assertEqual(response.status_code, 200) # Assert if the response status code is not 200
        self.assertEqual(data["results"], user_result) 
    
    #######################################################################################################
    
    ######################################### Tests for User functions #####################################

    def test_login(self):
        url_login = "/user/login"
        full_url = self.url + url_login
        email = "hh@gmail.com"
        password = "12345"
        enc_pass = "$2a$10$O1hprMsmtNspXbmTAhzrKuLL5.ho.tC0r98g8YR25Yrclx2r3gjvK"
        body = {"email": email, "password": password}
        
        response = requests.post(full_url, json=body) # Send a GET request to the server
        data = response.json()  # Extract the JSON data from the response
        
        self.assertEqual(response.status_code, 200) # Assert if the response status code is not 200
        self.assertEqual(data["password"], enc_pass) # assert thet the password from the server equal to corrct password
    
    #######################################################################################################


if __name__ == '__main__':
    unittest.main()
    