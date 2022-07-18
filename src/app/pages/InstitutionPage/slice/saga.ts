import { errorHandler } from 'app/pages/App/slice/saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import { institutionService } from 'services';
import ObjectUtil from 'utils/ObjectUtil';
import { institutionActions as actions } from '.';

function* getList(action) {
  try {
    const result = yield call(() => institutionService.getAll(ObjectUtil.cleanObjectValue(action.payload)));

    yield put(actions.getListSuccess(result));
  } catch (err: any) {
    yield errorHandler({
      errorObject: err,
      errorAction: actions.getListFail(err.data.msg || err.data),
    });
  }
}

function* getTotalItem(action) {
  try {
    const data = yield call(() => institutionService.count(ObjectUtil.cleanObjectValue(action.payload)));

    yield put(actions.getTotalItem(data.total));
  } catch (err: any) {
    yield errorHandler({
      errorObject: err,
      errorAction: actions.getListFail(err.data.msg || err.data),
    });
  }
}

function* add(action) {
  try {
    const data = yield call(() => institutionService.create(action.payload));

    yield put(actions.addOne(data));
  } catch (err: any) {
    yield errorHandler({
      errorObject: err,
      errorAction: actions.failure(err.data.data || err.data),
    });
  }
}

function* update(action) {
  try {
    yield call(() => institutionService.update(action.payload.id, action.payload));

    yield put(actions.updateOne(action.payload));
  } catch (err: any) {
    yield errorHandler({
      errorObject: err,
      errorAction: actions.failure(err.data.data || err.data),
    });
  }
}

function* remove(action) {
  try {
    yield call(() => institutionService.delete(action.payload));

    yield put(actions.removeOne(action.payload));
  } catch (err: any) {
    yield errorHandler({
      errorObject: err,
      errorAction: actions.failure(err.data.data || err.data),
    });
  }
}

export function* institutionSaga() {
  yield takeLatest(actions.searchAction.type, getList);
  yield takeLatest(actions.getListAction.type, getList);
  yield takeLatest(actions.getTotalItemAction.type, getTotalItem);
  yield takeLatest(actions.addAction.type, add);
  yield takeLatest(actions.updateAction.type, update);
  yield takeLatest(actions.removeAction.type, remove);
}
