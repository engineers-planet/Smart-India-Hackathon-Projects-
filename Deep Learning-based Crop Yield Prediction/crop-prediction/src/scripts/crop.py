#!/usr/bin/env python
from __future__ import absolute_import
from __future__ import division
import os, csv
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
os.environ['KMP_DUPLICATE_LIB_OK']='True'
import math
import numpy as np
import pandas as pd
import tensorflow as tf
import sklearn
from sklearn import preprocessing
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from matplotlib import pyplot as plt
import matplotlib as mpl
from mpl_toolkits.mplot3d import Axes3D

data = pd.read_csv('Bihar/Jan.csv')
df = pd.DataFrame(data = data)
df = df.loc[ :, 'Rainfall':'PET'].values.astype(float)

min_max_scaler = preprocessing.MinMaxScaler()
values = min_max_scaler.fit_transform(df)
df_normalized = pd.DataFrame(values)
y = df_normalized[0]
X = df_normalized[[1,2,3,4,5,6]]
X_train, X_test, Y_train, Y_test = train_test_split(X, y, test_size = 0.2, random_state = 42)

x = np.asarray(X_train)
y = np.asarray(Y_train)

mpl.rcParams['legend.fontsize'] = 12

fig = plt.figure()
ax = fig.gca(projection ='3d')

ax.scatter(x[:, 1], x[:, 2], y, label ='y', s = 5)
ax.legend()
ax.view_init(45, 0)

plt.show()


def mse(coef, x, y):
	return np.mean((np.dot(x, coef) - y)**2)/2

def gradients(coef, x, y):
	return np.mean(x.transpose()*(np.dot(x, coef) - y), axis = 1)

def multilinear_regression(coef, x, y, lr, b1 = 0.9, b2 = 0.999, epsilon = 1e-8):
	prev_error = 0
	m_coef = np.zeros(coef.shape)
	v_coef = np.zeros(coef.shape)
	moment_m_coef = np.zeros(coef.shape)
	moment_v_coef = np.zeros(coef.shape)
	t = 0

	while True:
		error = mse(coef, x, y)
		if abs(error - prev_error) <= epsilon:
			break
		prev_error = error
		grad = gradients(coef, x, y)
		t += 1
		m_coef = b1 * m_coef + (1-b1)*grad
		v_coef = b2 * v_coef + (1-b2)*grad**2
		moment_m_coef = m_coef / (1-b1**t)
		moment_v_coef = v_coef / (1-b2**t)

		delta = ((lr / moment_v_coef**0.5 + 1e-8) *
				(b1 * moment_m_coef + (1-b1)*grad/(1-b1**t)))

		coef = np.subtract(coef, delta)
	return coef

coef = np.array([0, 0, 0, 0, 0, 0])
c = multilinear_regression(coef, x, y, 1e-1)
fig = plt.figure()
ax = fig.gca(projection ='3d')

ax.scatter(x[:, 1], x[:, 2], y, label ='y',
				s = 5, color ="dodgerblue")

ax.scatter(x[:, 1], x[:, 2], c[0] + c[1]*x[:, 1] + c[2]*x[:, 2],
					label ='regression', s = 5, color ="red")

ax.view_init(45, 0)
ax.legend()
plt.show()


regressor = LinearRegression()
regressor.fit(X_train, Y_train)
y_pred = regressor.predict(X_test)
print('y_pred  ',y_pred)


