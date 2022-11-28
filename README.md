# Mobile-Relawan-Kita
  <img src="./assets/icon.png" height="200">
  
  
  Adalah versi mobile dari [Sistem Informasi Relawan Kita](http://relawan-kita.000webhostapp.com/).
  > bila web diatas sudah tidak bisa digunakan, begitupula dengan aplikasi ini tidak dapat digunakan sebagaimana semestinya

## Apa itu Relawan Kita?
  Relawan kita adalah Sistem Informasi yang membantu penyaluran informasi kegiatan kerelawanan sekaligus manajemen data kerelawanan.

## Untuk siapa?
  Relawan Kita cocok digunakan untuk relawan yang sedang mencari kegiatan kerelawanan, juga untuk organisasi yang menginginkan acaranya tersebar keseluruh indonesia dengan fungsi yang lengkap termasuk penerimaan calon relawan sebagai relawan dalam acaranya.
  
## Installation
Aplikasi RelawanKita dapat didownload di [sini](https://drive.google.com/file/d/1poIqwi90dnh33aNUGaymAT6ROF3NnqSG/view?usp=sharing)
  
## Tech Stack
  Teknologi yang digunakan dalam membangun aplikasi ini adalah:
  - [Typescript](https://www.typescriptlang.org/) - _Bahasa pemrograman berbasis JavaScript yang menambahkan fitur strong-typing & konsep pemrograman OOP klasik (class, interface)._
  - [React Native](https://reactnative.dev/) [Expo](https://docs.expo.dev/)
    - [NativeBase](https://nativebase.io/) - _Library UI React Native "Mobile First" yang mengagumkan!_
    - [Axios](https://github.com/axios/axios) - _Library klien HTTP ringan, untuk pengganti fetch javascript asli._
    - [React Navigation](https://reactnavigation.org/) - _Digunakan untuk berpindah halaman_
      - React Navigation Bottom Navigation
      - React Navigation Native Stack
    - Expo
      - [Icons](https://icons.expo.fyi/)
      - [Image Picker](https://docs.expo.dev/versions/latest/sdk/imagepicker/)
    - [Async Storage](https://react-native-async-storage.github.io/async-storage/docs/install/) - _Library untuk menyimpan data_
    - [Date Time Picker](https://github.com/react-native-datetimepicker/datetimepicker) - _Library untuk menampilkan sekaligus mengambil data tanggal dan waktu._
  - [PHP](https://www.php.net/) - _Bahasa backend web yang populer_
  - [MySQL](https://www.mysql.com/) - _Relasional Database yang populer menggunakan bahasa SQL_

## Tools
  Berikut adalah tools yang kami gunakan untuk membangun aplikasi:
  - Figma - Tools Untuk untuk mendesain tampilan
  - Visual Studio Code - Code Editor
  - Git - Version Control Systems
  - GitHub - Layanan hos web bersama untuk proyek pengembangan perangkat lunak yang menggunakan sistem kendali versi Git dan layanan hosting internet.
  - Thunder Client, Postman - Aplikasi yang berfungsi sebagai REST CLIENT untuk uji coba REST API.
  - XAMPP - Alat pembangun server lokal yang membantu pengembangan proyek (Server Apache, Database MySQL, dan penerjemah bahasa PHP dan Perl)
  - Scrcpy - "Screen Copy" alat untuk melihat layar handphone di layar komputer.

## Fitur Aplikasi
  1. Authentikasi Pengguna (Login dan Register)
    
     <div>
      <image src="https://user-images.githubusercontent.com/69416923/144191965-f26759cf-97a7-4f39-9b5a-2d8ba676aff6.jpg" height="300" alt="Choose Login or Register">
      <image src="https://user-images.githubusercontent.com/69416923/144190971-0ef03fe6-3642-465e-b76c-b43ac5eb4659.png" height="300" alt="Register Screen 1">
      <image src="https://user-images.githubusercontent.com/69416923/144191023-4425a946-c169-4039-9989-53db438168c5.png" height="300" alt="Register Screen 2">
      <image src="https://user-images.githubusercontent.com/69416923/144192013-cc0f7779-ef80-4a4e-9443-3212c6bd5c9b.jpg" height="300" alt="Login Screen">
     </div>
        
  2. Detail Aktivitas + Whatsapp Integration
        
      <div style="align-items: center;">
         <image src="https://user-images.githubusercontent.com/69416923/144191196-49248d44-91f1-4e8e-89b2-87b0ba005603.png" height="400" alt="Detail Activity Screen">
      </div>
        
  3. Search Aktivitas (berdasarkan judul, jenis acara, dan nama organisasi)
        
      <div>
        <image src="https://user-images.githubusercontent.com/69416923/144191236-ddad8565-8f8d-4ff1-8a30-64058cba77ee.png" height="300" alt="Search Activity Screen">
      </div>
        
  4. Riwayat Aktivitas (termasuk status pendaftaran, ex. menunggu, diterima, atau ditolak)
        
      <div>
        <image src="https://user-images.githubusercontent.com/69416923/144207050-a8af9f7b-475a-4629-8b07-2ee8225c514b.png" height="300" alt="Riwayat Activity Screen">
      </div>
        
  5. Daftar Aktivitas
    <div>
      <image src="https://user-images.githubusercontent.com/69416923/144191272-0a9fa3e0-3c1d-49bd-8e30-c3fa7d97ce23.png" height="300" alt="List Activity">
      <image src="https://user-images.githubusercontent.com/69416923/144191055-0aa2ca89-ab77-49a4-9e7e-a9e85d5b9f5b.png" height="300" alt="Home Screen">
    </div>
        
  6. Edit Profil
    <div>
      <image src="https://user-images.githubusercontent.com/69416923/144192009-d8b6b7ed-d7b1-4d5d-b372-5b56b349d670.jpg" height="300" alt="Profile Screen">
    </div>
      
  7. Ubah Kata Sandi
    <div>
      <image src="https://user-images.githubusercontent.com/69416923/144221790-d0a3ca56-f9d9-492e-9ddc-4381a2d909d3.png" height="350" alt="Profile Screen">
    </div>
      
  8. Keluar Akun
  
## Getting Started
  Ikuti langkah getting started di https://reactnative.dev/ bagian expo + install [Expo Go]
  1. Download Source Code
  2. Ketik `npm`, atau bila pakai yarn ketik `yarn`
  3. `npm start` atau `yarn start`
  4. Pilih platform untuk di run.
