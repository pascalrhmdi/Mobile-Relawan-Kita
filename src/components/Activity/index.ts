import ActivityCard from "./ActivityCard";
import ActivityHistoryCard from "./ActivityHistoryCard";
import CategoryBox from "./CategoryBox";
import SearchBar from "./SearchBar";
import SearchInput from "./SearchInput";

export { ActivityCard, CategoryBox, SearchBar, SearchInput, ActivityHistoryCard };

interface CategoryDataInterface {
  id_jenis_acara: string;
  nama_jenis_acara: string;
  icon: string;
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

interface ActivityHistoryDataInterface {
  cover: string;
  id_acara: string;
  judul_acara: string;
  lokasi: string;
  nama_org: string;
  nama_jenis_acara: string;
  status : string;
}

export { CategoryDataInterface, ActivityDataInterface, ActivityHistoryDataInterface };
