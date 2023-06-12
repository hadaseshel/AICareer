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

    def remove_dup_proff(self, proffesions):
        seen = set()
        seen_add = seen.add
        return [x for x in proffesions if not (x in seen or seen_add(x))]

    def fit(self, matrix, user_id, user_answers):
        self.user_response_proff_matrix = matrix
        self.user_response_matrix = self.user_response_proff_matrix.drop(['occupation'], axis=1)

        self.user_response_matrix.loc[user_id] = user_answers
        np_matrix = self.user_response_matrix.values

        # normalize the ratings
        u_mean_answers = np.mean(np_matrix, axis=1).reshape(-1, 1) # not good
        norm_matrix = np_matrix - u_mean_answers + 0.001

        self.similarity = 1 - pairwise_distances(norm_matrix, metric='cosine')
        self.similarity = pd.DataFrame((self.similarity),  index=self.user_response_matrix.index,
                                       columns=self.user_response_matrix.index)

        return self

    def recommend_professions(self, user_id, k=5):

        # get the similarity row of the user to the other users
        similarity_row = self.similarity.loc[[user_id]].copy()

        # drop the similarity to the user itself
        similarity_row_without_user = similarity_row.drop([user_id], axis=1)

        top_k = similarity_row_without_user.iloc[0].nlargest(k)

        top_k = top_k.index
        rec_values = self.user_response_proff_matrix.loc[top_k, 'occupation'].tolist()

        similarity_row_after_choice = similarity_row_without_user

        # For case that there are duplicate proffesions
        while len(self.remove_dup_proff(rec_values)) < k:
            similarity_row_after_choice = similarity_row_after_choice.drop(top_k, axis=1)
            top_k = similarity_row_after_choice.iloc[0].nlargest(1).index
            new_rec_value = self.user_response_proff_matrix.loc[top_k, 'occupation'].tolist()
            rec_values = rec_values + new_rec_value

        return self.remove_dup_proff(rec_values)
