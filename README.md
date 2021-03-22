# DC Image Uploader API

An api to upload images. Complementary to [dc-img-uploader](https://github.com/sukcinitas/dc-img-uploader). You can check working application example [here](https://imago-uploader.netlify.app/).

#### Notes

 - This is created only for learning purposes. Only 3 image files are stored at a time.
 - More information: [dc-img-uploader](https://github.com/sukcinitas/dc-img-uploader).

---

## Built with

- Express 4
- Piexifjs 1

---

## Features

- Uploads an image file (JPEG, PNG or GIF).
- Removes EXIF Data from JPEG images.

---

## Setup

- Clone this repository - `git clone https://github.com/sukcinitas/dc-image-uploader-api`, install dependencies - `cd dc-image-uploader-api`, `npm install` (you will need `npm` and `node` installed globally);

  - `npm start` - to run the app on [localhost:3000](http://localhost:3000/)
  - `npm run dev` - to run the app on [localhost:3000](http://localhost:3000/) using nodemon

---

## Endpoints

<table>
  <tr>
    <th>URL & HTTP method</th>
    <th>Parameters | req body</th>
    <th>Response</th>
  </tr>
  <tr>
    <td>/api/upload-image <code>POST</code></td>
    <td>
      Request body:
      <ul>
        <li><em>multipart/form-data </em><code>{ image: <em>file</em> }</code></li>
      </ul>
    </td>
    <td>
      Success response: 
      <ul>
          <li><code>200</code> <code>{ status: true, message: 'File is uploaded.', data: { filename: <em>string</em>, mimetype: <em>string</em>, size: <em>number</em> } }</code></li>
      </ul>
      Error responses:
      <ul>
        <li><code>400</code> <code>{ status: false, message: 'Only image files are allowed!' }</code></li>
        <li><code>500</code> <code>{ status: false, err: <em>error message</em> }</code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>/api/images/:name <code>GET</code></td>
    <td>
      none
    </td>
    <td>
      Success response: 
      <ul>
          <li><code>200</code> <code><em>image file</em></code></li>
          <li><code>404</code> <code>{ status: false, err: <em>error message</em> }</code></li>
      </ul>
    </td>
  </tr>
</table>