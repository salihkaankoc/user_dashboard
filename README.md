# User Management Dashboard


## Özellikler

-  Rol tabanlı yetkilendirme (Admin, Editor, Viewer)
-  Kullanıcı yönetimi (CRUD işlemleri)
-  Modern ve responsive tasarım
-  Arama ve filtreleme
-  Sayfalama
-  Optimized performans
-  Form validasyonları
-  Error handling

## Teknolojiler

- React 18
- React Router v6
- Context API
- Modern CSS
- Font Awesome

## Kurulum ve Çalıştırma

Bağımlılıkları yükleyin
npm install

Uygulamayı başlatın
npm start




## Test Kullanıcıları

- Admin: admin@example.com / pass123123
- Editor: editor@example.com / pass123123
- Viewer: viewer@example.com / pass123123

## Rol Yetkileri

- **Admin**: Tüm işlemler (create, read, update, delete)
- **Editor**: Görüntüleme ve düzenleme
- **Viewer**: Sadece görüntüleme

## Proje Yapısı


src/
├── components/ # Yeniden kullanılabilir bileşenler
├── contexts/ # Context API tanımlamaları
├── hooks/ # Custom hooks
├── pages/ # Sayfa bileşenleri
├── services/ # API servisleri
└── styles/ # Global CSS



## Özellik Detayları


## Özellik Detayları

### Kullanıcı Yönetimi
- Kullanıcı listeleme (tüm roller)
- Kullanıcı ekleme (sadece Admin)
- Kullanıcı düzenleme (Admin ve Editor)
- Kullanıcı silme (sadece Admin)
  - Silme işlemi öncesi onay modal'ı
  - Geri alınamaz işlem uyarısı

### Arama ve Filtreleme
- İsim ve email'e göre arama
- Role göre filtreleme
- Anlık arama sonuçları

### UI/UX
- Modern tasarım
- Responsive layout
- Loading states
- Error messages
- Success notifications
- Modal dialoglar
  - Edit/Create form modal'ı
  - Delete confirmation modal'ı
- Form validasyonları

### Güvenlik
- Role-based access control
- Protected routes
- Error boundary
- Input validasyonları
