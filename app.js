// Çalışan bilgilerini saklamak için dizi
let calisanlar = [];

// Çalışan ekleme fonksiyonu
function calisanEkle(isim, yas, departman, maas) {
    // Hatalı giriş kontrolü
    if (!isim || yas < 18 || maas < 0) {
        console.log("Hata: İsim boş olamaz, yaş 18'den küçük olamaz ve maaş negatif olamaz.");
        return;
    }

    // Aynı isimde çalışan kontrolü
    for (let calisan of calisanlar) {
        if (calisan.isim === isim) {
            console.log("Hata: Bu isimde bir çalışan zaten mevcut.");
            return;
        }
    }

    // Çalışanı ekleme
    calisanlar.push({ isim, yas, departman, maas });
    console.log(`${isim} adlı çalışan başarıyla eklendi.`);
}

// Çalışan güncelleme fonksiyonu
function calisanGuncelle(isim, yeniYas, yeniDepartman, yeniMaas) {
    let bulunan = false;

    for (let calisan of calisanlar) {
        if (calisan.isim === isim) {
            bulunan = true;

            // Hatalı güncelleme kontrolü
            if (yeniYas < 18 || yeniMaas < 0) {
                console.log("Hata: Yaş 18'den küçük olamaz ve maaş negatif olamaz.");
                return;
            }

            // Güncelleme işlemi
            calisan.yas = yeniYas;
            calisan.departman = yeniDepartman;
            calisan.maas = yeniMaas;
            console.log(`${isim} adlı çalışanın bilgileri güncellendi.`);
            break;
        }
    }

    if (!bulunan) {
        console.log("Hata: Güncellenecek çalışan bulunamadı.");
    }
}

// Çalışan silme fonksiyonu
function calisanSil(isim) {
    const index = calisanlar.findIndex(calisan => calisan.isim === isim);

    if (index !== -1) {
        calisanlar.splice(index, 1);
        console.log(`${isim} adlı çalışan silindi.`);
    } else {
        console.log("Hata: Silinecek çalışan bulunamadı.");
    }
}

// Çalışanları listeleme fonksiyonu
function calisanListele(departman = null, maasSirasi = null) {
    let liste = [...calisanlar];

    // Departmana göre filtreleme
    if (departman) {
        liste = liste.filter(calisan => calisan.departman === departman);
        if (liste.length === 0) {
            console.log("Bu departmanda çalışan bulunmamaktadır.");
            return;
        }
    }

    // Maaşa göre sıralama
    if (maasSirasi === "artan") {
        liste.sort((a, b) => a.maas - b.maas);
    } else if (maasSirasi === "azalan") {
        liste.sort((a, b) => b.maas - a.maas);
    }

    console.log("Çalışan Listesi:");
    liste.forEach(calisan => {
        console.log(`İsim: ${calisan.isim}, Yaş: ${calisan.yas}, Departman: ${calisan.departman}, Maaş: ${calisan.maas}`);
    });
}

// Maaşı belirli bir değerin altında olan çalışanları listeleme
function maasiAltindaListele(maasLimiti) {
    const altindaCalisanlar = calisanlar.filter(calisan => calisan.maas < maasLimiti);
    if (altindaCalisanlar.length === 0) {
        console.log("Maaşı belirtilen limitin altında çalışan bulunmamaktadır.");
        return;
    }
    
    console.log(`${maasLimiti} TL'den düşük maaş alan çalışanlar:`);
    altindaCalisanlar.forEach(calisan => {
        console.log(`İsim: ${calisan.isim}, Maaş: ${calisan.maas}`);
    });
}

// En yüksek maaş
function enYuksekMaasliCalisan() {
    if (calisanlar.length === 0) {
        console.log("Hiç çalışan yok.");
        return;
    }
    
    let enYuksek = calisanlar[0];
    for (let calisan of calisanlar) {
        if (calisan.maas > enYuksek.maas) {
            enYuksek = calisan;
        }
    }
    console.log(`En yüksek maaşlı çalışan: ${enYuksek.isim}, Maaş: ${enYuksek.maas}`);
}

// Toplam maaş
function toplamMaasHesapla(departman = null) {
    let toplam = 0;
    let sayac = 0;

    for (let calisan of calisanlar) {
        if (!departman || calisan.departman === departman) {
            toplam += calisan.maas;
            sayac++;
        }
    }

    if (sayac === 0) {
        console.log("Bu departmanda çalışan yok.");
    } else {
        console.log(`Toplam maaş: ${toplam} TL`);
    }
}


