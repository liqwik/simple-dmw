import { errorHandler } from 'app/pages/App/slice/saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import { internalUserService } from 'services';
import ObjectUtil from 'utils/ObjectUtil';
import { internalUserActions as actions } from '.';

function* getList(action) {
  try {
    const result = yield call(() =>
      internalUserService.getAll(ObjectUtil.cleanObjectValue(action.payload)),
    );

    yield put(actions.getListSuccess(result));
  } catch (err) {
    yield errorHandler({
      errorObject: err,
      errorAction: actions.getListFail(err.data.msg || err.data),
    });
  }
}

function* getDetail(action) {
  try {
    const result = yield call(() =>
      internalUserService.getDetail(action.payload),
    );

    yield put(actions.getDetailSuccess(result));
  } catch (err) {
    yield errorHandler({
      errorObject: err,
      errorAction: actions.getDetailFail(err.data.msg || err.data),
    });
  }
}

function* getTotalItem(action) {
  try {
    const data = yield call(() =>
      internalUserService.count(ObjectUtil.cleanObjectValue(action.payload)),
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
    const data = yield call(() => internalUserService.create(action.payload));

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
    yield call(() =>
      internalUserService.update(action.payload.id, action.payload),
    );

    yield put(actions.updateOne(action.payload));
  } catch (err) {
    yield errorHandler({
      errorObject: err,
      errorAction: actions.failure(err.data.data || err.data),
    });
  }
}

export function* internalUserSaga() {
  yield takeLatest(actions.getListAction.type, getList);
  yield takeLatest(actions.getTotalItemAction.type, getTotalItem);
  yield takeLatest(actions.addAction.type, add);
  yield takeLatest(actions.updateAction.type, update);
  yield takeLatest(actions.getDetailAction.type, getDetail);
}
