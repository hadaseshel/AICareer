# Hail Zan Bar 322766353

import time
import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import pairwise_distances


class Recommender:
    def __init__(self):
        self.similarity = np.NaN
        self.user_response_proff_matrix = pd.DataFrame()
        self.user_response_matrix = pd.DataFrame()

    def fit(self, matrix, user_id, user_answers):
        self.user_response_proff_matrix = matrix
        #self.user_response_proff_matrix.to_csv('output1.csv', index=True)
        self.user_response_matrix = self.user_response_proff_matrix.drop(['occupation'], axis=1)
        #self.user_response_matrix.to_csv('output2.csv', index=True)

        self.user_response_matrix.loc[user_id] = user_answers
        np_matrix = self.user_response_matrix.values

        # normalize the ratings
        u_mean_answers = np.mean(np_matrix, axis=1).reshape(-1, 1) # not good
        norm_matrix = np_matrix - u_mean_answers + 0.001

         # User - User based collaborative filtering
        #start_time = time.time()

        self.similarity = 1 - pairwise_distances(norm_matrix, metric='cosine')
        self.similarity = pd.DataFrame((self.similarity),  index=self.user_response_matrix.index,
                                       columns=self.user_response_matrix.index)
        self.similarity.to_csv('output5.csv', index=True)

        #time_taken = time.time() - start_time
        #print('User Model in {} seconds'.format(time_taken))

        return self

    def recommend_professions(self, user_id, k=5):

        # get the similarity of the user to the others
        similarity_row = self.similarity.loc[[user_id]].copy()
        similarity_row.to_csv('output4.csv', index=True)

        # drop the similarity to the user itself
        similarity_row_without_user = similarity_row.drop([user_id], axis=1)
        top_k = similarity_row_without_user.iloc[0].nlargest(k)
        #top_k = similarity_row_without_user[user_id].sort_values(ascending=False, kind='stable').head(k)
        top_k = top_k.index
        rec_values = self.user_response_proff_matrix.loc[top_k, 'occupation'].tolist()
        return rec_values
