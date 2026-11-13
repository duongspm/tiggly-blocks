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
img/ogp.jpg           ảnh banner (màn hình chính + ảnh chia sẻ)
js/core/              lõi nhận diện khối
  scenes.js           nền SVG sống động + SCENE_OF (trò nào dùng nền nào)
  config.js           SHAPES (màu, âm, SVG), ngưỡng, biến trạng thái
  storage.js          lưu/đọc dữ liệu học khối (localStorage)
  helpers.js          beep, say (giọng nói), svg()
  input.js            theo dõi điểm chạm, gom khối, so khớp chữ ký
  render.js           vẽ khối, gọi G.block / G.lift của trò đang chơi
  calibration.js      học khối (phụ huynh)
js/games/             mỗi trò một file
  common.js           biến/hàm dùng chung (hudSet, ok, no, end...)
  free.js  find.js  pictures.js  memory.js  safari.js
  count.js  pattern.js  riddle.js  balloon.js  draw.js
js/modes.js           danh sách MODES + setMode()
js/ui/                màn hình chính, khu vực phụ huynh, hiệu ứng
```
Các file JS là script thường (không phải module) và dùng chung biến toàn cục, nên **thứ tự thẻ `<script>` trong `index.html` quan trọng**. Giữ nguyên thứ tự: core, games, modes, ui.

## Cách nhận diện khối
- Mỗi khối có vài điểm chạm cố định (thường 3), khác nhau về **khoảng cách và vị trí** giữa các điểm.
- "Chữ ký" của khối = các khoảng cách giữa mọi cặp điểm, xếp tăng dần (không phụ thuộc hướng xoay).
- Khi có nhiều điểm chạm, `findBlocks()` (`js/core/input.js`) thử mọi nhóm điểm đủ gần nhau, so với mẫu đã học, rồi chọn tập nhóm không trùng điểm phủ được nhiều điểm nhất và sai số nhỏ nhất. Vì vậy **nhiều khối đặt cùng lúc, kể cả sát nhau, vẫn tách được**.
- Khối phải ổn định 90 ms mới tính là "mới đặt" và mất điểm 200 ms mới tính là "nhấc lên" (`CONFIRM_MS`, `LIFT_MS` trong `js/core/render.js`).
- Sai số cho phép chỉnh ở khu vực phụ huynh (mặc định 18%). Nút "Kiểm tra độ phân biệt" cho biết các khối có đủ khác nhau không.
- Giới hạn phần cứng: iPad nhận tối đa khoảng 11 điểm chạm cùng lúc, nên 3 khối (9 điểm) luôn ổn, 4 khối (12 điểm) có thể không đủ.

## Hiệu ứng chuyển màn hình và hiệu năng
- `js/ui/transition.js`: màn hình mờ dần sang một lớp phủ pastel nhạt, đổi màn hình khi đã phủ kín rồi mờ ra (khoảng 1,2 giây, chỉ đổi độ mờ, không phóng to, không trượt). Chỉnh nhanh/chậm ở `FADE_IN`, `HOLD`, `FADE_OUT`. Việc dựng game nặng nằm sau lớp phủ nên không giật.
- Chỉ animate `transform` và `opacity`. Khối và điểm chạm được dùng lại phần tử và dời bằng `translate`, không tạo/xóa DOM mỗi lần chạm.
- Nền SVG được nạp sẵn và chuyển mờ chéo (`setScene` trong `js/core/scenes.js`).
- Mọi `setTimeout` đi qua sổ theo dõi trong `js/core/config.js`; `clearAllTimers()` hủy hẹn giờ của trò cũ khi đổi màn hình.
- Có hỗ trợ `prefers-reduced-motion` (người dùng tắt hiệu ứng chuyển động trong hệ điều hành).

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
