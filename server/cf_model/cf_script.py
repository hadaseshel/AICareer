import sys
import json
from recommendation_system.data import *
from recommendation_system.evaluation import *
from recommendation_system.collaborative_filtering import Recommender


# Load the data passed from the Node.js server
# Read JSON data from stdin
data = json.loads(sys.stdin.read())

# Convert JSON data to DataFrame
user_response_matrix_raw = pd.DataFrame.from_dict(data, orient='index')

user_id = sys.argv[1]
str_user_answers = sys.argv[2]

str_user_answers = json.loads(str_user_answers)
user_answers = list(map(int, str_user_answers))

# Instantiate your recommendation system
recommender = Recommender().fit(user_response_matrix_raw, user_id, user_answers)

# Process the data and perform recommendation calculations
recommendations = recommender.recommend_professions(user_id, k=5)

# Return the recommendations to the Node.js server
print(json.dumps(recommendations))
