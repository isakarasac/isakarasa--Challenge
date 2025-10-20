import { Transaction } from "@mysten/sui/transactions";

/**
 * Bir kahramanı (Hero) belirtilen fiyattan (SUI birimi cinsinden) pazar yerinde listelemek için 
 * bir işlem (Transaction) oluşturur.
 *
 * @param packageId - Marketplace Move paketinin ID'si.
 * @param heroId - Satışa sunulacak kahramanın ID'si.
 * @param priceInSui - Kahramanın satış fiyatı (SUI birimi cinsinden, dize olarak).
 * @returns Tamamlanmış Sui İşlemi (Transaction).
 */
export const listHero = (
  packageId: string,
  heroId: string,
  priceInSui: string,
) => {
  const tx = new Transaction();

  // 1 SUI = 1,000,000,000 MIST (Sui'nin en küçük birimi)
  const SUI_TO_MIST_MULTIPLIER = 1_000_000_000n;
  
  // Fiyatı dizeden BigInt'e çevir ve MIST'e dönüştür.
  // Büyük sayıları hassasiyet kaybı olmadan işlemek için BigInt kullanmak zorunludur.
  const priceInMist = BigInt(priceInSui) * SUI_TO_MIST_MULTIPLIER;

  // Move çağrısını ekle: list_hero fonksiyonu
  tx.moveCall({
    target: `${packageId}::marketplace::list_hero`,
    arguments: [
      // Satışa sunulacak kahraman nesnesi
      tx.object(heroId), 
      // Fiyat (MIST birimi cinsinden u64 olarak)
      // tx.pure.u64(), BigInt/string tipini Move'un u64 tipine çevirir.
      tx.pure.u64(priceInMist.toString()), 
    ],
  });

  return tx;
};
