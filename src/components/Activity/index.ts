import ActivityCard from "./ActivityCard";
import CategoryBox from "./CategoryBox";
import SearchBar from "./SearchBar";

export { ActivityCard, CategoryBox, SearchBar };

interface CategoryDataInterface {
  id_jenis_acara: string;
  nama_jenis_acara: string;
}

interface ActivityDataInterface {
  cover: string;
  id_acara: string;
  judul_acara: string;
  jumlah_kebutuhan: string;
  lokasi: string;
  nama: string;
  nama_jenis_acara: string;
  tanggal_acara: string;
  tanggal_batas_registrasi: string;
  total_pendaftar: string;
}

export { CategoryDataInterface, ActivityDataInterface };
