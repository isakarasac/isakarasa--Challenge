import { Transaction } from "@mysten/sui/transactions";

/**
 * Belirtilen kahramanı pazar yerinden listeden kaldırmak (delist) için bir işlem (Transaction) oluşturur.
 * Kahraman, işlemi başlatan yetkili (admin) tarafından listenmiş olmalıdır.
 *
 * @param packageId - Marketplace Move paketinin ID'si.
 * @param listHeroId - Listeden kaldırılacak olan listenmiş kahramanın ID'si (ListHero nesnesi).
 * @param adminCapId - Yönetici yetki nesnesinin ID'si.
 * @returns Tamamlanmış Sui İşlemi (Transaction).
 */
export const delist = (
  packageId: string,
  listHeroId: string,
  adminCapId: string,
) => {
  const tx = new Transaction();

  // Move çağrısını ekle: delist fonksiyonu
  // Bu fonksiyon, listenmiş kahramanı pazar yerinden kaldırır ve 
  // kahraman nesnesini (Hero) orijinal sahibine iade eder.
  tx.moveCall({
    target: `${packageId}::marketplace::delist`,
    arguments: [
      // Yönetici yetki nesnesi
      tx.object(adminCapId), 
      // Listelenmiş kahraman nesnesi
      tx.object(listHeroId), 
    ],
  });
  return tx;
};
