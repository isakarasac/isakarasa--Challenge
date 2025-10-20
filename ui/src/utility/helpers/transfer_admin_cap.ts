import { Transaction } from "@mysten/sui/transactions";

/**
 * Yönetici yetki nesnesini (AdminCap) belirtilen adrese transfer etmek için 
 * bir Sui işlemi (Transaction) oluşturur.
 *
 * @param adminCapId - Transfer edilecek yönetici yetki nesnesinin ID'si (string).
 * @param to - Yetkinin transfer edileceği alıcı adres (string).
 * @returns Tamamlanmış Sui İşlemi (Transaction).
 */
export const transferAdminCap = (adminCapId: string, to: string) => {
  const tx = new Transaction();

  // tx.transferObjects() metodu, tek bir yapılandırma objesi (objects ve recipient içeren) alır.
  tx.transferObjects(
    [tx.object(adminCapId)], // 1. Argüman (Nesneler)
    to                       // 2. Argüman (Alıcı Adres)
  );


  return tx;
};