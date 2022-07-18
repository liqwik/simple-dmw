import { errorHandler } from 'app/pages/App/slice/saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import { categoryService } from 'services';
import { categoryActions as actions } from '.';

function* getList(action) {
  try {
    const result = yield call(() => categoryService.getAll(action.payload));

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
    const data = yield call(() => categoryService.count(action.payload));

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
    const data = yield call(() => categoryService.create(action.payload));

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
    yield call(() => categoryService.update(action.payload.id, action.payload));

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
    yield call(() => categoryService.delete(action.payload));

    yield put(actions.removeOne(action.payload));
  } catch (err: any) {
    yield errorHandler({
      errorObject: err,
      errorAction: actions.failure(err.data.data || err.data),
    });
  }
}

export function* categorySaga() {
  yield takeLatest(actions.getListAction.type, getList);
  yield takeLatest(actions.getTotalItemAction.type, getTotalItem);
  yield takeLatest(actions.addAction.type, add);
  yield takeLatest(actions.updateAction.type, update);
  yield takeLatest(actions.removeAction.type, remove);
}
