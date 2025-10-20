import { Transaction } from "@mysten/sui/transactions";

/**
 * Belirtilen kahraman (hero) nesnesini kullanarak yeni bir savaş arenası (arena) oluşturmak için
 * bir işlem (Transaction) oluşturur.
 *
 * @param packageId - Arena Move paketinin ID'si.
 * @param heroId - Arena oluşturmak için feda edilecek kahramanın ID'si.
 * @returns Tamamlanmış Sui İşlemi (Transaction).
 */
export const createArena = (packageId: string, heroId: string) => {
  const tx = new Transaction();

  // Move çağrısını ekle: create_arena fonksiyonu
  // Bu fonksiyon, heroId'yi kullanarak yeni bir Arena nesnesi oluşturur.
  tx.moveCall({
    target: `${packageId}::arena::create_arena`,
    arguments: [
      // Arena oluşturmak için kullanılacak kahraman nesnesi
      tx.object(heroId), 
    ],
  });

  return tx;
};
