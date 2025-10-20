import { Transaction } from "@mysten/sui/transactions";

/**
 * Belirtilen listedeki kahramanı (ListHero) satın almak için bir işlem (Transaction) oluşturur.
 * İşlem, gas coin'den (SUI) tam ödeme miktarı için bir coin böler ve bu coin'i ödeme olarak kullanır.
 *
 * @param packageId - Marketplace Move paketinin ID'si.
 * @param listHeroId - Satın alınacak olan listedenmiş kahramanın ID'si (ListHero nesnesi).
 * @param priceInSui - Satın alma fiyatı (SUI birimi cinsinden, dize olarak).
 * @returns Tamamlanmış Sui İşlemi (Transaction).
 */
export const buyHero = (packageId: string, listHeroId: string, priceInSui: string) => {
  const tx = new Transaction();

  // 1. SUI'yi MIST'e Dönüştür (1 SUI = 1,000,000,000 MIST)
  const SUI_TO_MIST_MULTIPLIER = 1_000_000_000n;
  
  // BigInt kullanarak fiyatı hassasiyet kaybı olmadan MIST'e çevir.
  const priceInMist = BigInt(priceInSui) * SUI_TO_MIST_MULTIPLIER;

  // 2. Tam Ödeme Miktarı İçin Coin Böl
  // tx.gas, işlemin imzalayıcısının birincil SUI coin'ine referans verir.
  // tx.splitCoins() bu coin'i kullanarak istenen miktarda (priceInMist) yeni bir coin nesnesi oluşturur.
  // Sonuç bir dizi döndürür, bu yüzden [paymentCoin] ile ilk (ve tek) elemanı alıyoruz.
  const [paymentCoin] = tx.splitCoins(
    tx.gas, 
    [tx.pure.u64(priceInMist.toString())] // MIST miktarını u64 olarak gönder
  ); 

  // 3. Kahramanı Satın Almak İçin Move Çağrısını Ekle
  tx.moveCall({
    target: `${packageId}::marketplace::buy_hero`,
    arguments: [
      // Satın alınacak ListHero nesnesi
      tx.object(listHeroId), 
      // Ödeme için yeni oluşturulan coin nesnesi
      paymentCoin, 
    ],
  });

  return tx;
};