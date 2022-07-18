import { call, put, takeLatest, delay } from 'redux-saga/effects';
import { authService } from 'services';
import { actions } from '.';

function* login(action) {
  yield delay(500);

  try {
    const { idtt, pwd } = action.payload;

    const data = yield call(() => authService.login({ identity: idtt, password: pwd }));

    yield put(actions.loginSuccess(data));
  } catch (err: any) {
    const { status } = err;

    if (status === 404) {
      yield put(actions.loginFailed('Account is not found.'));
    } else if (status === 409) {
      yield put(actions.loginFailed('Password is incorrect.'));
    } else {
      yield put(actions.loginFailed('Server is not available.'));
    }
  }
}

export function* loginSaga() {
  yield takeLatest(actions.loginAction.type, login);
}
