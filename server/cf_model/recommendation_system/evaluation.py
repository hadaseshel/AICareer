import pandas as pd
import numpy as np
from sklearn.metrics import mean_squared_error


def user_item_RMSE(test_set, pred_matrix, strategy):
    relevant_pred_matrix = pred_matrix.loc[test_set.index, test_set.columns]
    res_matrix = np.square(relevant_pred_matrix - test_set)
    res = np.sqrt(np.nanmean(res_matrix.values))
    res = res.round(5)

    if strategy == "user":
        print("RMSE user-based cf:", res)
    elif strategy == "item":
        print("RMSE item-based cf:", res)


def benchmark_RMSE(test_set, u_mean_rating):
    pred_matrix = u_mean_rating.loc[test_set.index]
    res_matrix = np.square(test_set.sub(pred_matrix, axis=0))
    res = np.sqrt(np.nanmean(res_matrix.values))
    res = res.round(5)
    print("RMSE benchmark:", res)


def RMSE(test_set, cf):
    "*** YOUR CODE HERE ***"
    user_item_test = pd.pivot_table(test_set, index='UserId', columns='ProductId', values='Rating', aggfunc=np.sum)
    u_mean_rating = cf.user_item_matrix.mean(axis=1)
    user_item_RMSE(user_item_test, cf.pred, cf.strategy)
    benchmark_RMSE(user_item_test, u_mean_rating)


def relevant_items(user_item_matrix, user_id):
    items_row = user_item_matrix.loc[user_id]
    relevant_items_row = items_row[~np.isnan(items_row)]
    return relevant_items_row.index


def benchmark_k_recommended(cf, k):
    mean_ratings = cf.user_item_matrix.mean(axis=0)
    top_k = (mean_ratings.sort_values(ascending=False, kind='stable').head(k)).index
    return list(top_k)


def intersection_size(relevant_list, k_recommended):
    inter = set(relevant_list).intersection(k_recommended)
    return len(inter)


def precision_at_k(test_set, cf, k):
    if k == 0:
        return
    relevant_set = test_set.loc[test_set['Rating'] >= 3]
    relevant_user_item = pd.pivot_table(relevant_set, index='UserId', columns='ProductId',
                                        values='Rating', aggfunc=np.sum)
    rel_users_num = len(relevant_user_item.index)
    cf_sum = 0
    bench_sum = 0

    # run on all user_id with at least one rating >= 3 and compute for them precisions by cf/benchmark
    for user_id in relevant_user_item.index:
        rel = relevant_items(relevant_user_item, user_id)
        rec = cf.recommend_items(user_id, k)
        cf_sum += intersection_size(rel, rec) / k
        rec = benchmark_k_recommended(cf, k)
        bench_sum += intersection_size(rel, rec) / k

    cf_res = round((cf_sum / rel_users_num), 5)
    bench_res = round((bench_sum / rel_users_num), 5)
    print("precision@k", cf.strategy, "based cf:", cf_res)
    print("precision@k benchmark:", bench_res)


def recall_at_k(test_set, cf, k):
    relevant_set = test_set.loc[test_set['Rating'] >= 3]
    relevant_user_item = pd.pivot_table(relevant_set, index='UserId', columns='ProductId',
                                        values='Rating', aggfunc=np.sum)
    rel_users_num = len(relevant_user_item.index)
    cf_sum = 0
    bench_sum = 0

    # run on all user_id with at least one rating >= 3 and compute for them precisions by cf/benchmark
    for user_id in relevant_user_item.index:
        rel = relevant_items(relevant_user_item, user_id)
        rec = cf.recommend_items(user_id, k)
        cf_sum += intersection_size(rel, rec) / len(rel)
        rec = benchmark_k_recommended(cf, k)
        bench_sum += intersection_size(rel, rec) / len(rel)

    cf_res = round((cf_sum / rel_users_num), 5)
    bench_res = round((bench_sum / rel_users_num), 5)
    print("recall@k", cf.strategy, "based cf:", cf_res)
    print("recall@k benchmark:", bench_res)
