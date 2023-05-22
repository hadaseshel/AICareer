# Hail Zan Bar 322766353

import time
import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import pairwise_distances


class Recommender:
    def __init__(self, strategy='user'):
        self.strategy = strategy
        self.similarity = np.NaN
        self.pred = np.NaN
        self.user_item_matrix = pd.DataFrame()

    def fit(self, matrix):
        " * ** YOUR CODE HERE ** * "
        self.user_item_matrix = matrix
        np_matrix = matrix.to_numpy()

        # normalize the ratings
        u_mean_rating = matrix.mean(axis=1).to_numpy().reshape(-1, 1)
        norm_matrix = np_matrix - u_mean_rating + 0.001
        norm_matrix[np.isnan(norm_matrix)] = 0

        if self.strategy == 'user':
            # User - User based collaborative filtering
            start_time = time.time()

            self.similarity = 1 - pairwise_distances(norm_matrix, metric='cosine')
            self.pred = pd.DataFrame((u_mean_rating + self.similarity.dot(norm_matrix) / np.array(
                [np.abs(self.similarity).sum(axis=1)]).T),  index=matrix.index, columns=matrix.columns)
            self.pred = self.pred.round(2)

            time_taken = time.time() - start_time
            print('User Model in {} seconds'.format(time_taken))

            return self

        elif self.strategy == 'item':
            # Item - Item based collaborative filtering
            start_time = time.time()

            self.similarity = 1 - pairwise_distances(norm_matrix.T, metric='cosine')
            self.pred = pd.DataFrame((u_mean_rating + norm_matrix.dot(self.similarity) / np.array(
                [np.abs(self.similarity).sum(axis=1)])), index=matrix.index, columns=matrix.columns)
            self.pred = self.pred.round(2)

            time_taken = time.time() - start_time
            print('Item Model in {} seconds'.format(time_taken))

            return self

    def recommend_items(self, user_id, k=5):
        " * ** YOUR CODE HERE ** * "
        if user_id not in self.user_item_matrix.index:
            return None

        predicted_ratings_row = self.pred.loc[user_id].copy()
        data_matrix_row = self.user_item_matrix.loc[user_id]
        predicted_ratings_unrated = predicted_ratings_row[np.isnan(data_matrix_row)]
        top_k = predicted_ratings_unrated.sort_values(ascending=False, kind='stable').head(k)
        top_k = top_k.index
        return list(top_k)
