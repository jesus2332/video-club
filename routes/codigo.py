from sklearn.model_selection import GridSearchCV
from sklearn.model_selection import RandomizedSearchCV
from sklearn.model_selection import train_test_split
from sklearn.datasets import load_breast_cancer
from sklearn.neural_network import MLPClassifier


cancer = load_breast_cancer()

param_grid = {
    'hidden_layer_sizes': [(50,100)], #capas
    'activation': ['relu', 'tanh', 'identity'],
    'solver':['lbfgs', 'adam'],
    'learning_rate_init':[0.001, 0.01, 0.1]
}

grid_search = GridSearchCV(MLPClassifier(max_iter=1000), param_grid, cv=5)

X_train, X_test, y_train, y_test = train_test_split(cancer.data, cancer.target, random_state=0)
grid_search.fit(X_train, y_train)
print('Best parameter of grid search', grid_search.best_params_)
print("Test set score of grid search: {:.2f}".format(grid_search.score(X_test, y_test)))

random_search = RandomizedSearchCV(MLPClassifier(max_iter=1000), param_distributions=param_grid, cv=5, random_state=0)
random_search.fit(X_train, y_train)

print('Best parameter of randomized search', random_search.best_params_)
print("Test set score of randomized search: {:.2f}".format(random_search.score(X_test, y_test)))
