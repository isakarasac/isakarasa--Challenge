import { Transaction } from "@mysten/sui/transactions";

/**
 * Belirtilen kahraman (hero) ve arena (arena) nesnelerini kullanarak bir savaş (battle) işlemi oluşturur.
 * * @param packageId - Arena Move paketinin ID'si.
 * @param heroId - Savaşta kullanılacak kahramanın ID'si.
 * @param arenaId - Savaşın yapılacağı arena nesnesinin ID'si.
 * @returns Tamamlanmış Sui İşlemi (Transaction).
 */
export const battle = (packageId: string, heroId: string, arenaId: string) => {
  const tx = new Transaction();

  // Move çağrısını ekle: battle fonksiyonu
  // Bu fonksiyon, iki nesneyi (kahraman ve arena) alır ve 
  // Move modülünde tanımlanan savaş mantığını tetikler.
  tx.moveCall({
    target: `${packageId}::arena::battle`,
    arguments: [
      // Savaşta kullanılacak kahraman nesnesi
      tx.object(heroId), 
      // Savaşın yapılacağı arena nesnesi
      tx.object(arenaId), 
    ],
  });

  return tx;
};