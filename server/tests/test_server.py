import unittest
from unittest import TestCase
import requests
import unittest


class TestServer(TestCase):
    def setUp(self):
        self.url = "http://localhost:4000/api"
               
    #################################### Tests for Occupation function ####################################
    def test_get_occupations_count(self):
        url_occupations_count = "/occupations/count"
        full_url = self.url + url_occupations_count
        
        response = requests.get(full_url) # Send a GET request to the server
        data = response.json()  # Extract the JSON data from the response
        
        self.assertEqual(response.status_code, 200) # Assert if the response status code is not 200
        num_of_occupations = 858 # Assert if the response status code is not 200
        self.assertEqual(data, num_of_occupations)
        
    def test_get_occupations_by_description(self):
        description = "Animal Breeders"
        occupations = "/occupations/"
        url = f"{self.url + occupations}?Description={description}"
        
        response = requests.get(url) # Send a GET request to the server
        data = response.json()  # Extract the JSON data from the response
        
        self.assertEqual(response.status_code, 200) # Assert if the response status code is not 200
        self.assertEqual(data["Description"], description)

    def test_get_occupations_by_code(self):
        code = "45-2021.00"
        occupations = "/occupations"
        url = f"{self.url +occupations}/Code/?Code={code}"
        
        response = requests.get(url) # Send a GET request to the server
        data = response.json() # Extract the JSON data from the response
        
        self.assertEqual(response.status_code, 200) # Assert if the response status code is not 200
        self.assertEqual(data["Code"], code)
    
    #######################################################################################################
    
    ####################################### Tests for Home function #######################################
    
    # 2 functions
    
    #######################################################################################################
    
    ##################################### Tests for Questions function ####################################
    
    # 6 functions
    
    #######################################################################################################
    
    ###################################### Tests for Response function ####################################
    
    # 2 functions
    
    #######################################################################################################
    
    ###################################### Tests for Recommend function ###################################
    
    # 3 functions
    
    #######################################################################################################
    
    ######################################### Tests for User function #####################################
    
    # 6 functions
    
    #######################################################################################################


if __name__ == '__main__':
    unittest.main()
    