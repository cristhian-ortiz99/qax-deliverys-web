import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

interface Cuenta {
  numero: string;
  titular: string;
  saldo: number;
}

interface Transaccion{
    numeroCuenta: string;
    tipo: 'DEPOSITO' | 'RETIRO';
    monto: number;
}

const cuentas: Cuenta[] = [];
const transacciones: Transaccion[] = [];

function preguntar(pregunta: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(pregunta, (respuesta) => {
      resolve(respuesta);
    });
  });
}

function buscarCuenta(numero: string): Cuenta | undefined {
  return cuentas.find(c => c.numero === numero);
}

async function main() {
  console.log("=== CAJERO AUTOMÁTICO QAX ===\n");
  console.log();


  while(cuentas.length<10){
    let numero: string;
    while(true){
        numero = await preguntar('Ingrese numero de cuenta (4 digitos) o 000 para salir: ');

        if(numero === '000'){
            console.log('Saliendo del registro...\n');
            rl.close();
            return;
        }

        if (!/^\d{4}$/.test(numero)) {
            console.log('❌ El número debe tener exactamente 4 dígitos');
            continue;
        }
        const existe = buscarCuenta(numero);
        if(existe){
            console.log('❌ Esta cuenta ya existe');
            continue;
        }
        break;
    }

    const titular = await preguntar('Nombre del titular: ');
    const saldoTexto = await preguntar('Saldo inicial: ');
    const saldo = Number(saldoTexto);

    cuentas.push({
        numero,titular,saldo
    });

    console.log('✅ Cuenta registrada\n');
    const continuar = await preguntar('Registrar otra cuenta? (s/n): ');
    if(continuar.toLowerCase() !== 's')break;
  }
  // =========================
  // MENÚ PRINCIPAL
  // =========================
  let salir  = false;
  while(!salir){
    console.log(`=== MENÙ CAJERO===
1. CONSULTAR SALDO
2. DEPOSITAR
3. RETIRAR
000. SALIR`);

    const opcion = await preguntar('Seleccione una opción: ');
    if (opcion ==='000'){
        salir = true;
        break;
    }

    const numero = await preguntar('Numero de cuenta: ');
    const cuenta = buscarCuenta(numero);

    if(!cuenta){
        console.log('❌ Cuenta no existe\n');
        continue;
    }
    switch(opcion){
        case '1':
            console.log(`Saldo disponible: $${cuenta.saldo}`);
            break;
        
        case '2':
            const dep = Number(await preguntar('Monto a depositar: '));

            if(dep>0){
                cuenta.saldo +=dep;

                transacciones.push({
                    numeroCuenta: cuenta.numero,
                    tipo: 'DEPOSITO',
                    monto: dep
                });

                console.log('✅ Deposito exitoso');
            }else{
                console.log('❌ Monto invalido');
            }
            break;
        case'3':
            const ret = Number(await preguntar('Monto a retirar: '));

            if(ret >10000){
                console.log('❌ Monto excede al límite permitido');
            }
            else if(ret > cuenta.saldo){
                console.log('❌ Fondos insuficientes');
            }
            else if(ret<=0){
                console.log('❌Monto invalido');
            }
            else{
                cuenta.saldo -= ret;

                transacciones.push({
                    numeroCuenta: cuenta.numero,
                    tipo: 'RETIRO',
                    monto: ret
                })
                console.log('✅ Retiro exitoso');
            }
            break;

            default: console.log('❌Opción invaida');
    }
    console.log();
  }

    // RESUMEN


     console.log('===RESUMEN===');
     let total = 0;
     
     for(const c of cuentas){
        console.log(`${c.numero} - ${c.titular} - $${c.saldo}`);
        total += c.saldo;
     }
     console.log(`\nTotal General: $${total}\n`);
     console.log('===TRANSACCIONES REALIZADAS===');
     if(transacciones.length===0){
        console.log('No se realizaron transacciones');
     }else{
        for(const t of transacciones){
            console.log(`Cuenta: ${t.numeroCuenta} | Tipo: ${t.tipo} | Monto: $${t.monto}`);
        }
     }

  rl.close();
}

main();
