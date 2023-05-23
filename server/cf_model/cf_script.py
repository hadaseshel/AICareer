import sys
import json
from recommendation_system.data import *
from recommendation_system.evaluation import *
from recommendation_system.collaborative_filtering import Recommender


# Load the data passed from the Node.js server
user_response_matrix_raw = pd.read_json(sys.stdin, orient ='index')
#data = json.load(sys.stdin)
user_id = sys.argv[1]

#user_response_matrix_raw = pd.pivot_table(dataset, index='UserId',
                                          #columns='ProductId', values='Rating', aggfunc=np.sum)
#print(user_response_matrix_raw.head())

# Instantiate your recommendation system
recommender = Recommender().fit(user_response_matrix_raw)


# Process the data and perform recommendation calculations
recommendations = recommender.reommend_items(user_id, k=5)

# Return the recommendations to the Node.js server
print(json.dumps(recommendations))
