# Tiggly Blocks

Ứng dụng web cho trẻ em, nhận diện khối vật lý (tròn, vuông, tam giác, sao) qua các điểm chạm trên màn hình cảm ứng.
Chỉ dùng HTML, CSS và JavaScript thuần, không cần build.

## Chạy thử
Mở `index.html` trên iPad/tablet/điện thoại cảm ứng. Nếu mở bằng máy tính, nên chạy một máy chủ tĩnh, ví dụ:
`python3 -m http.server 8000` rồi vào `http://localhost:8000`.

## Cấu trúc
```
index.html            khung trang + thứ tự nạp script
css/style.css         toàn bộ giao diện (luật sau ghi đè luật trước)
js/core/              lõi nhận diện khối
  config.js           SHAPES (màu, âm, SVG), ngưỡng, biến trạng thái
  storage.js          lưu/đọc dữ liệu học khối (localStorage)
  helpers.js          beep, say (giọng nói), svg()
  input.js            theo dõi điểm chạm, gom khối, so khớp chữ ký
  render.js           vẽ khối, gọi G.block / G.lift của trò đang chơi
  calibration.js      học khối (phụ huynh)
js/games/             mỗi trò một file
  common.js           biến/hàm dùng chung (hudSet, ok, no, end...)
  free.js  find.js  pictures.js  memory.js  safari.js
  count.js  pattern.js  riddle.js  balloon.js
js/modes.js           danh sách MODES + setMode()
js/ui/                màn hình chính, khu vực phụ huynh, hiệu ứng
```
Các file JS là script thường (không phải module) và dùng chung biến toàn cục, nên **thứ tự thẻ `<script>` trong `index.html` quan trọng**. Giữ nguyên thứ tự: core, games, modes, ui.

## Gộp thành 1 file
`python3 build.py` tạo `dist/tiggly-blocks.html` tự chứa (dùng khi nơi đăng chỉ nhận một file).

## Việc hay làm
- **Thêm khối mới:** thêm một mục vào `SHAPES` (`js/core/config.js`) và một khóa rỗng vào `samples` ở cùng file và ở nút "Xóa dữ liệu học" (`js/core/calibration.js`). Sau đó vào khu vực phụ huynh để học khối.
- **Thêm tranh ghép:** thêm một dòng vào `PICS` trong `js/games/pictures.js`: `{n:"Tên",p:[["circle",0,0],["star",1.2,0]]}`. Mỗi mảnh gồm loại hình, vị trí ngang, vị trí dọc (đơn vị bằng kích thước một khối, các mảnh cách nhau ít nhất 1,2).
- **Thêm con vật Safari:** thêm mục vào `ANI` trong `js/games/safari.js`. Khóa là các loại hình xếp theo thứ tự chữ cái, ví dụ `"circle,star"`. Hoạt ảnh của con vật nằm ở cuối `css/style.css` (lớp `.an-<tên>`).
- **Thêm trò chơi mới:** tạo `js/games/ten.js` với object có `block(t,x,y,n)`, `lift(t)` và tùy chọn `start()`. Thêm một dòng vào `MODES` (`js/modes.js`), một mục vào `TILE` (`js/ui/home.js`) và thêm thẻ `<script>` vào `index.html` trước `js/modes.js`.
- **Đổi giao diện:** sửa `css/style.css`. Màu chủ đạo nằm ở các biến `:root` và ở object `SHAPES`.

## Dữ liệu lưu trong trình duyệt (localStorage)
`tiggly-samples` (mẫu đã học), `tiggly-found` (sổ động vật), `tiggly-pics` (tranh đã ghép).
