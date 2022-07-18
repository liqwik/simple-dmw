import { commonActions } from '.';
import { put } from 'redux-saga/effects';

export function* requestHandler({ action, onSuccess, onError }) {
  try {
    const result = yield action();

    yield onSuccess(result);
  } catch (err: any) {
    if (err.status === 401) {
      yield put(commonActions.unauthorized());
    } else if (err.status === 403) {
      yield put(commonActions.forbidden());
    } else {
      yield onError(err);
    }
  }
}

export function* errorHandler({ errorObject, errorAction }) {
  const { status } = errorObject;

  if (status && status === 401) {
    return yield put(commonActions.unauthorized());
  }

  if (status && status === 403) {
    return yield put(commonActions.forbidden());
  }

  if (errorAction) {
    return yield put(errorAction);
  }

  return errorObject;
}
