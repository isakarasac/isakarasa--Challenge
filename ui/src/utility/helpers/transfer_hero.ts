import { Transaction } from "@mysten/sui/transactions";

/**
 * Bir Hero nesnesini belirtilen adrese transfer etmek için
 * bir Sui işlemi (Transaction) oluşturur.
 *
 * @param heroId - Transfer edilecek Hero nesnesinin ID'si (string).
 * @param to - Hero'nun transfer edileceği alıcı adres (string).
 * @returns Tamamlanmış Sui İşlemi (Transaction).
 */
export const transferHero = (heroId: string, to: string) => {
  const tx = new Transaction();

  // 'adminCapId' yerine 'heroId' kullanılıyor
  tx.transferObjects(
    [tx.object(heroId)], // 1. Argüman (Nesne)
    to                    // 2. Argüman (Alıcı Adres)
  );

  return tx;
};