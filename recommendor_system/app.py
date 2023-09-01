from flask import Flask, render_template, request, redirect, url_for, session,jsonify
# from sqlalchemy import create_engine,text
# import re 
# from datetime import datetime
import random
import os,sys
from pathlib import Path
# import pandas as pd
# import pandas.io.sql as psql
# import pickle
# import atexit
import ast
import json
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import sklearn
from sklearn.decomposition import TruncatedSVD

app = Flask(__name__,template_folder='templates',static_folder='static')

event_score={'view':1, 'saved_for_later':3, 'added_to_cart':4, 'bought':15, 'like':2}
user_id='user1'
existing=True
category=""
sub_category=""

@app.route('/')
def home():
    return render_template('login.html')

@app.route('/send_user',methods=['POST'])
def send_user():
    global user_id
    global existing
    x=request.form.get('q')
    if(x=='hello'):
        existing=False
    else:
        user_id=x
    # print("hello")
    return "hello"

@app.route('/get_home')
def get_home():
    return render_template('home.html')

@app.route('/send_category',methods=['POST'])
def send_category():
    global category
    category=request.form.get('q')
    return "hello"

@app.route('/get_sub')
def get_sub():
    return render_template('sub.html')

@app.route('/send_sub_category',methods=['POST'])
def send_sub_category():
    global sub_category
    sub_category=request.form.get('q')

@app.route('/get_main')
def get_main():
    return render_template('main.html')

@app.route('/recommend',methods=['POST'])
def recommend():
    
    global user_id
    # global udf
    # global pdf
    udf=pd.read_csv('udf.csv',index_col=0)
    pdf=pd.read_csv('pdf.csv',index_col=0)
    # print(udf)
    if(existing):
        # print("1")
        products=pdf.index
        u_p=pd.DataFrame(columns=products)
        for x in event_score:
            udf[x]=udf[x].apply(ast.literal_eval)
        for index, row in udf.iterrows():
            new_row={}
            for i in products:
                new_row[i]=0
            # print(new_row)
            for x in event_score:
                sc=event_score[x]
                # df['list_column'].apply(ast.literal_eval)
                # print(type(row[x]))
                # print(x)
                for i in row[x]:
                    # print(i)
                    # break
                    new_row[i]+=sc
            #     break 
            # break
            # print(new_row)
            u_p.loc[u_p.shape[0]] = new_row
            # print(u_p)
            # break
        # print("2")
        u_p.index=udf.index
        u_p=u_p.rename_axis("user_id")
        u_p_t=u_p.T
        u_p_t=u_p_t.rename_axis("prod_id")
        SVD = TruncatedSVD(n_components=10)
        # print(u_p)
        decomposed_matrix = SVD.fit_transform(u_p_t)
        correlation_matrix = np.corrcoef(decomposed_matrix)
        
        # print("hello")
        # user=0
        # print(user_id)
        l=udf.loc[user_id, 'bought']
        # print("3")
        ans=[]
        for x in l:
            y=int(x[4:])-1
            m=list(u_p_t.index[correlation_matrix[y] > 0.80])
        #     print(type(m))
            for z in m:
                ans.append(z)

        def cosine_similarity(u, v):
            dot_product = np.dot(u, v)
            norm_u = np.linalg.norm(u)
            norm_v = np.linalg.norm(v)
            similarity = dot_product / (norm_u * norm_v)
            return similarity
        np_res=np.array(u_p.values)
        num_users = np_res.shape[0]
        
        similarity_matrix_cosine = np.zeros((num_users, num_users))
        # # similarity_matrix_pearson = np.zeros((num_users, num_users))
        # print(type(num_users))
        # print("4")
        for i in range(num_users):
            for j in range(num_users):
                similarity_matrix_cosine[i, j] = cosine_similarity(np_res[i], np_res[j])
        
        user=int(user_id[4:])-1
        # user=0
        # print("5")
        top_indices = sorted(range(len(similarity_matrix_cosine[user])), key=lambda i: similarity_matrix_cosine[user][i], reverse=True)[:5]
        top_indices.remove(user)
       
        for x in top_indices:
        #     print(x)
           
            m=udf.iloc[x,udf.columns.get_loc('bought')]
            # print("hello")
            for z in m:
                ans.append(z)
        
        ans=list(set(ans))
        # print("hello")
        res=[]
        for i in range(12):
            dummy={}
            dummy['prod_id']=ans[i]
            dummy['name']=pdf.loc[ans[i], 'name']
            dummy['image_link']=pdf.loc[ans[i], 'image_link']
            dummy['price']=int(pdf.loc[ans[i], 'price'])
            res.append(dummy)
        
        # for d in res[0]:
        #     print(type(res[0][d]))
        # def obj_dict(obj):
        #     return obj.__dict__

        # json_string = json.dumps(res)
        # fin = json.dumps(res)
        return res
    else:
        dum=pdf.sort_values(by=['score'], ascending=False)
        dum=dum.head(12)
        res=[]
        for index, row in dum.iterrows():
            dummy={}
            dummy['prod_id']=index
            dummy['name']=row['name']
            dummy['image_link']=row['image_link']
            dummy['price']=int(row['price'])
            res.append(dummy)
        
        # print(res)
        # print(res[0])
        # fin = json.dumps(res)
        return res
    # return render_template('main.html')

@app.route('/update',methods=['POST'])
def update():
    print("hello")
    # global udf
    # global pdf
    global user_id
    udf=pd.read_csv('udf.csv')
    pdf=pd.read_csv('pdf.csv')
    # if(existing):
    #     global user_id
    # else:
    #     user_id
    l=request.get_json()
    print(l)
    # event_type=request.form.get('event_type')
    # prod_id=request.form.get('prod_id')
    # if prod_id not in udf.loc[user_id,'event_type']:
    #     udf.loc[user_id,'event_type'].append(prod_id)
    #     pdf.loc[prod_id, 'score']+=event_score[event_type]
    # udf.to_csv('udf.csv')
    # pdf.to_csv('pdf.csv')
    # print("done")
    return "hello"
if __name__ == '__main__':
    app.run(debug=True)