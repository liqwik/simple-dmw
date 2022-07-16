import { errorHandler } from 'app/pages/App/slice/saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import { userService } from 'services';
import ObjectUtil from 'utils/ObjectUtil';
import { userActions as actions } from '.';

function* getList(action) {
  try {
    const result = yield call(() =>
      userService.getAll(ObjectUtil.cleanObjectValue(action.payload)),
    );

    yield put(actions.getListSuccess(result));
  } catch (err) {
    yield errorHandler({
      errorObject: err,
      errorAction: actions.getListFail(err.data.msg || err.data),
    });
  }
}

function* getTotalItem(action) {
  try {
    const data = yield call(() =>
      userService.count(ObjectUtil.cleanObjectValue(action.payload)),
    );

    yield put(actions.getTotalItem(data.total));
  } catch (err) {
    yield errorHandler({
      errorObject: err,
      errorAction: actions.getListFail(err.data.msg || err.data),
    });
  }
}

function* add(action) {
  try {
    const data = yield call(() => userService.create(action.payload));

    yield put(actions.addOne(data));
  } catch (err) {
    yield errorHandler({
      errorObject: err,
      errorAction: actions.failure(err.data.data || err.data),
    });
  }
}

function* update(action) {
  try {
    yield call(() => userService.update(action.payload.id, action.payload));

    yield put(actions.updateOne(action.payload));
  } catch (err) {
    yield errorHandler({
      errorObject: err,
      errorAction: actions.failure(err.data.data || err.data),
    });
  }
}

function* remove(action) {
  try {
    yield call(() => userService.delete(action.payload));

    yield put(actions.removeOne(action.payload));
  } catch (err) {
    yield errorHandler({
      errorObject: err,
      errorAction: actions.failure(err.data.data || err.data),
    });
  }
}

export function* userSaga() {
  yield takeLatest(actions.getListAction.type, getList);
  yield takeLatest(actions.getTotalItemAction.type, getTotalItem);
  yield takeLatest(actions.addAction.type, add);
  yield takeLatest(actions.updateAction.type, update);
  yield takeLatest(actions.removeAction.type, remove);
}
