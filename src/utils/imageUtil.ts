import { message } from 'antd';

export class ImageUtil {
  static getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  static getBase64Async(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  static beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

  /**
   * @param {string} url
   * @param {string} [size=w_150] - use w_150, w_300 sth like that
   */
  static getImageThumbnail(url, size = 'w_150') {
    if (!url) return this.defaultImg();

    return url.replace('/upload', `/upload/${size}`);
  }

  static defaultImg() {
    return 'https://via.placeholder.com/300';
  }
}
