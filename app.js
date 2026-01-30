 import {
  Lucid,
  Blockfrost,
  Constr,
  Data
} from "https://unpkg.com/lucid-cardano@0.10.11/web/mod.js";

/* =====================================================
   DATUM SCHEMA (MUST MATCH HASKELL)
===================================================== */

const RecurringDatum = Data.Object({
  rdPayer: Data.Bytes(),
  rdRecipient: Data.Bytes(),
  rdAmount: Data.Integer(),
  rdInterval: Data.Integer(),
  rdNextPayment: Data.Integer(),
});

/* =====================================================
   CONFIG
===================================================== */

const BLOCKFROST_URL = "https://cardano-preprod.blockfrost.io/api/v0";
const BLOCKFROST_KEY = "preprodYjRkHfcazNkL0xxG9C2RdUbUoTrG7wip";
const NETWORK = "Preprod";

/* =====================================================
   PLUTUS SCRIPT (PASTE YOUR CBOR HERE)
===================================================== */

const SCRIPT_CBOR = "590f61010000323232323322332232323232323233223232323232323233223232323232323233322232323232323232323232323233223232223223232533532323232533500315335323235002222222222222533533355301e12001502025335333573466e3c0380041181144d40d4004540d0010841184110d401488888015400440dc4cd5ce2481096e6f7420706179657200036153355335323232350022235002223500522350022253335333502400b00600215335001153350051333502200b00300710411333502200b00300710411333502200b003007355003222222222222005335015335016350303500522222001038335019502f0381233333333001017225335333573466e1c0080040e80e4408054cd4ccd5cd19b8900200103a039101e101f22333573466e200080040e80e488ccd5cd19b8900200103a03922333573466e240080040e40e888ccd5cd19b8800200103903a225335333573466e240080040e80e440044008894cd4ccd5cd19b8900200103a039100210011037133573892109746f6f206561726c7900036153355335333573466e20c8c0d4004ccd54c0304800488cd54c044480048d400488cd540fc008cd54c050480048d400488cd54108008ccd40048cc1152000001223304600200123304500148000004cd54c044480048d400488cd540fc008ccd40048cd54c054480048d400488cd5410c008d5405c00400488ccd5540480600080048cd54c054480048d400488cd5410c008d54058004004ccd55403404c00800540e4c8c8d4004888888888888ccd54c0684800488d40088888d401088cd400894cd4ccd5cd19b8f01700104e04d133504f00600810082008504700a5002350042222200435004222220030360371037133573892112726563697069656e74206e6f7420706169640003615335533553353500222350022222222222223333500d250342503425034233355301f1200150212350012253355335333573466e3cd400888008d4010880081241204ccd5cd19b873500222001350042200104904810481350380031503700d213500122350012222350092235002222222222222333553021120012235002222253353501822350062232335005233500425335333573466e3c0080041641605400c416081608cd4010816094cd4ccd5cd19b8f0020010590581500310581533500321533500221335002233500223350022335002233036002001205b2335002205b23303600200122205b222335004205b2225335333573466e1c01800c17817454cd4ccd5cd19b8700500205e05d13303d004001105d105d10561533500121056105613350530060051005504e00a1326320323357389201024c660003310362215335001153335350022222002103821333573466e1cd4c08400488888004cdc01a803911110009a8039111100101d01c9081c91081d081b899ab9c490112646174756d206e6f7420616476616e6365640003610361036135001220023333573466e1cd55cea80224000466442466002006004646464646464646464646464646666ae68cdc39aab9d500c480008cccccccccccc88888888888848cccccccccccc00403403002c02802402001c01801401000c008cd40b00b4d5d0a80619a8160169aba1500b33502c02e35742a014666aa060eb940bcd5d0a804999aa8183ae502f35742a01066a05806e6ae85401cccd540c00e1d69aba150063232323333573466e1cd55cea80124000466a04a6464646666ae68cdc39aab9d5002480008cd40a8cd4109d69aba150023045357426ae8940088c98c811ccd5ce02382402289aab9e5001137540026ae854008c8c8c8cccd5cd19b8735573aa0049000119a81699a8213ad35742a004608a6ae84d5d1280111931902399ab9c047048045135573ca00226ea8004d5d09aba2500223263204333573808608808226aae7940044dd50009aba1500533502c75c6ae854010ccd540c00d08004d5d0a801999aa8183ae200135742a004606c6ae84d5d1280111931901f99ab9c03f04003d135744a00226ae8940044d5d1280089aba25001135744a00226ae8940044d5d1280089aba25001135744a00226ae8940044d55cf280089baa00135742a008604c6ae84d5d1280211931901899ab9c03103202f3333573466e1d40152002212200223333573466e1d40192000212200123263203133573806206405e05c603400c205e2c26aae7940044dd500089aab9d3754002222444666aa600824002a06066aa600e2400246a0024466aa06a0046aa012002666aa600824002446a00444a66a666aa6018240026466a02044666a006440040040026a00244002246600244a66a004206c200206646a002446601400400a00c2006266a068008006a06200266aa600e2400246a002446466aa06c006600200a640026aa07044a66a00226aa0140064426a00444a66a6601800401022444660040140082600c006004640026aa0624422444a66a00220044426600a004666aa600e2400200a0080022242444600600822424446002008640026aa05c442244a66a0022a05c44266a05e600800466aa600c24002008002640026aa05a4422444a66a00226a00644002442666a00a440046008004666aa600e2400200a00800244666ae68cdc7801000814013899a80091299a801108018800a80989109198008018010910919800801801091091980080180111199ab9a3370e00400204604424446a004446a00644a666a666a01200e0080042a66a0062002204e204c204e2442466002006004244464646464a666a00c42a666a00c42a666a0104260089309801a4c2a666a00e4260089309801a4c201a20162a666a00e4260089309801a4c2a666a00c4260089309801a4c20182a666a00a42014201620122a666a00a42a666a00e42600a930980224c2a666a00c42600a930980224c201820142a666a00c42600a930980224c2a666a00a42600a930980224c20164a666a00a42a666a00e42a666a00e42666a0160140040022c2c2c20162a666a00c42a666a00c42666a0140120040022c2c2c201420124a666a00842a666a00c42a666a00c42666a0140120040022c2c2c20142a666a00a42a666a00a42666a0120100040022c2c2c201220104a666a00642a666a00a42a666a00a42666a0120100040022c2c2c20122a666a00842a666a00842666a01000e0040022c2c2c2010200e4a666a00442a666a00842a666a00842666a01000e0040022c2c2c20102a666a00642a666a00642666a00e00c0040022c2c2c200e200c246a0024444444400e244400624440042444002464646464646666ae68cdc39aab9d5005480008ccccc8888848ccccc00401801401000c008dd71aba15005375c6ae854010dd69aba15003375a6ae854008dd69aba135744a004464c6403666ae7006c0700644d5d1280089aba25001135744a00226aae7940044dd50008919118011bac0013200135501f2233335573e0024a03c466a03a60086ae84008c00cd5d100100b919191999ab9a3370e6aae7540092000233221233001003002300c35742a004600a6ae84d5d1280111931900b19ab9c016017014135573ca00226ea80048c8c8c8c8cccd5cd19b8735573aa00890001199991110919998008028020018011919191999ab9a3370e6aae7540092000233221233001003002301535742a00466a01a0286ae84d5d1280111931900d99ab9c01b01c019135573ca00226ea8004d5d0a802199aa8043ae500735742a0066464646666ae68cdc3a800a4008464244460040086ae84d55cf280191999ab9a3370ea0049001119091118008021bae357426aae7940108cccd5cd19b875003480008488800c8c98c8074cd5ce00e80f00d80d00c89aab9d5001137540026ae854008cd4025d71aba135744a004464c6402e66ae7005c0600544d5d1280089aba25001135573ca00226ea80044cd54005d73ad112232230023756002640026aa03844646666aae7c008940708cd406ccd54074c018d55cea80118029aab9e500230043574400602a26ae84004488c8c8cccd5cd19b875001480008d401cc014d5d09aab9e500323333573466e1d400920022500723263201433573802802a02402226aae7540044dd50008909118010018891000919191999ab9a3370ea002900311909111180200298039aba135573ca00646666ae68cdc3a8012400846424444600400a60126ae84d55cf280211999ab9a3370ea006900111909111180080298039aba135573ca00a46666ae68cdc3a8022400046424444600600a6eb8d5d09aab9e500623263201233573802402602001e01c01a26aae7540044dd5000919191999ab9a3370e6aae7540092000233221233001003002300535742a0046eb4d5d09aba2500223263200e33573801c01e01826aae7940044dd50009191999ab9a3370e6aae75400520002375c6ae84d55cf280111931900619ab9c00c00d00a13754002464646464646666ae68cdc3a800a401842444444400646666ae68cdc3a8012401442444444400846666ae68cdc3a801a40104664424444444660020120106eb8d5d0a8029bad357426ae8940148cccd5cd19b875004480188cc8848888888cc008024020dd71aba15007375c6ae84d5d1280391999ab9a3370ea00a900211991091111111980300480418061aba15009375c6ae84d5d1280491999ab9a3370ea00c900111909111111180380418069aba135573ca01646666ae68cdc3a803a400046424444444600a010601c6ae84d55cf280611931900a99ab9c01501601301201101000f00e00d135573aa00826aae79400c4d55cf280109aab9e5001137540024646464646666ae68cdc3a800a4004466644424466600200a0080066eb4d5d0a8021bad35742a0066eb4d5d09aba2500323333573466e1d4009200023212230020033008357426aae7940188c98c8038cd5ce00700780600589aab9d5003135744a00226aae7940044dd5000919191999ab9a3370ea002900111909118008019bae357426aae79400c8cccd5cd19b875002480008c8488c00800cdd71aba135573ca008464c6401666ae7002c0300240204d55cea80089baa00112232323333573466e1d400520042500623333573466e1d400920022350083006357426aae7940108cccd5cd19b87500348000848880088c98c8030cd5ce00600680500480409aab9d5001137540022424446006008224440024646666ae68cdc3a800a4004401446666ae68cdc3a801240004014464c6400c66ae7001801c01000c4d55ce9baa001499240103505431001200132001355009223350014800088d4008894cd4ccd5cd19b8f00200d009008130070011300600332001355008223350014800088d4008894cd4ccd5cd19b8f00200c00800710011300600312200212200111220021221223300100400311221233001003002488100223370000400222464600200244660066004004003";

const script = {
  type: "PlutusV2",
  script: SCRIPT_CBOR,
};

/* =====================================================
   GLOBAL STATE
===================================================== */

let lucid;
let walletAddress;
let scriptAddress;
let subscriptions = []; // Store multiple subscriptions

/* =====================================================
   INIT
===================================================== */

async function init() {
  lucid = await Lucid.new(
    new Blockfrost(BLOCKFROST_URL, BLOCKFROST_KEY),
    NETWORK
  );

  const api = await window.cardano.lace.enable();
  lucid.selectWallet(api);

  walletAddress = await lucid.wallet.address();
  scriptAddress = lucid.utils.validatorToAddress(script);

  console.log("Wallet:", walletAddress);
  console.log("Script:", scriptAddress);

  // UPDATE UI TO SHOW CONNECTED
  updateUIAfterConnection();
  
  // LOAD ALL SUBSCRIPTIONS
  await loadAndUpdateSubscriptions();
  
  log("Wallet connected");
}

/* =====================================================
   UPDATE UI AFTER CONNECTION
===================================================== */

async function updateUIAfterConnection() {
  // Update wallet address display
  const walletEl = document.getElementById("walletAddress");
  if (walletEl && walletAddress) {
    const shortAddr = walletAddress.substring(0, 8) + "..." + walletAddress.substring(walletAddress.length - 8);
    walletEl.textContent = shortAddr;
  }
  
  // Update status indicator
  const statusDot = document.getElementById("statusDot");
  const statusText = document.getElementById("statusText");
  if (statusDot && statusText) {
    statusDot.classList.add("active");
    statusText.textContent = "Connected";
    statusDot.style.backgroundColor = "#2ed573";
  }
}

/* =====================================================
   LOAD AND UPDATE ALL SUBSCRIPTIONS
===================================================== */

async function loadAndUpdateSubscriptions() {
  try {
    if (!lucid || !walletAddress) return;
    
    const utxos = await lucid.utxosAt(scriptAddress);
    
    // Find all subscriptions for current wallet
    const payerPkh = lucid.utils.getAddressDetails(walletAddress).paymentCredential.hash;
    subscriptions = [];
    
    for (const utxo of utxos) {
      if (!utxo.datum) continue;
      
      try {
        const datum = Data.from(utxo.datum, RecurringDatum);
        
        if (datum.rdPayer === payerPkh) {
          subscriptions.push({
            utxo: utxo,
            datum: datum,
            txHash: utxo.txHash,
            outputIndex: utxo.outputIndex
          });
        }
      } catch (error) {
        console.warn("Error parsing datum:", error);
      }
    }
    
    // Update UI with all subscriptions
    updateSubscriptionsUI();
    
  } catch (error) {
    console.error("Error loading subscriptions:", error);
  }
}

/* =====================================================
   UPDATE SUBSCRIPTIONS UI
===================================================== */

function updateSubscriptionsUI() {
  const container = document.getElementById("subscriptionsList");
  const noSubscriptions = document.getElementById("noSubscriptions");
  
  if (!container) return;
  
  container.innerHTML = '';
  
  if (subscriptions.length === 0) {
    noSubscriptions.style.display = "block";
    return;
  }
  
  noSubscriptions.style.display = "none";
  
  subscriptions.forEach((sub, index) => {
    const datum = sub.datum;
    const amountADA = Number(datum.rdAmount) / 1_000_000;
    const nextPaymentDate = new Date(Number(datum.rdNextPayment) * 1000);
    const now = Math.floor(Date.now() / 1000);
    const isDue = Number(datum.rdNextPayment) <= now;
    
    // Get subscription name from form or generate one
    const subscriptionName = document.getElementById("subscriptionName")?.value || `Subscription ${index + 1}`;
    const subscriptionDesc = document.getElementById("subscriptionDescription")?.value || `Payment of ${amountADA} ADA`;
    
    const subscriptionItem = document.createElement("div");
    subscriptionItem.className = "subscription-item";
    subscriptionItem.innerHTML = `
      <div class="subscription-details">
        <div class="subscription-title">${subscriptionName}</div>
        <div class="subscription-description">${subscriptionDesc}</div>
        <div class="info-grid" style="margin-top: 10px; grid-template-columns: repeat(2, 1fr);">
          <div class="info-item">
            <div class="info-label">Amount</div>
            <div class="info-value">${amountADA} ADA</div>
          </div>
          <div class="info-item">
            <div class="info-label">Next Payment</div>
            <div class="info-value">${nextPaymentDate.toLocaleDateString()}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Status</div>
            <div class="info-value" style="color: ${isDue ? '#ffa502' : '#2ed573'}">${isDue ? 'Due' : 'Active'}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Interval</div>
            <div class="info-value">${Number(datum.rdInterval) / 86400} days</div>
          </div>
        </div>
      </div>
      <div class="subscription-actions">
        <button class="btn-success btn-sm" onclick="executeSinglePayment(${index})">
          <i class="fas fa-check-circle"></i>
          Pay Now
        </button>
        <button class="btn-danger btn-sm" onclick="cancelSingleSubscription(${index})">
          <i class="fas fa-ban"></i>
          Cancel
        </button>
      </div>
    `;
    
    container.appendChild(subscriptionItem);
  });
}

/* =====================================================
   DATUM / REDEEMER
===================================================== */

function mkRecurringDatum(payer, recipient, amount, intervalSeconds, nextPayment) {
  return Data.to(
    {
      rdPayer: payer,
      rdRecipient: recipient,
      rdAmount: BigInt(amount),
      rdInterval: BigInt(intervalSeconds),
      rdNextPayment: BigInt(nextPayment),
    },
    RecurringDatum
  );
}

// Redeemers
const payRedeemer = Data.to(new Constr(0, [])); // Pay
const cancelRedeemer = Data.to(new Constr(1, [])); // Cancel

/* =====================================================
   CREATE RECURRING PAYMENT
===================================================== */

async function createRecurringPayment() {
  const subscriptionName = document.getElementById("subscriptionName").value.trim();
  const subscriptionDesc = document.getElementById("subscriptionDescription").value.trim();
  const recipientAddr = document.getElementById("recipient").value.trim();
  const amountInput = document.getElementById("amount").value.trim();
  const intervalSelect = document.getElementById("interval").value;
  const customIntervalInput = document.getElementById("customInterval")?.value || "30";
  
  if (!subscriptionName) {
    log("Please enter a subscription name", "error");
    return;
  }
  
  if (!recipientAddr) {
    log("Please enter recipient address", "error");
    return;
  }
  
  if (!amountInput || isNaN(amountInput) || Number(amountInput) <= 0) {
    log("Please enter a valid amount", "error");
    return;
  }
  
  let intervalDays;
  if (intervalSelect === "custom") {
    if (!customIntervalInput || isNaN(customIntervalInput) || Number(customIntervalInput) <= 0) {
      log("Please enter valid custom interval", "error");
      return;
    }
    intervalDays = BigInt(customIntervalInput);
  } else {
    intervalDays = BigInt(intervalSelect);
  }
  
  const amountAda = BigInt(Math.floor(Number(amountInput) * 1_000_000));
  const payerPkh = lucid.utils.getAddressDetails(walletAddress).paymentCredential.hash;
  
  let recipientPkh;
  try {
    recipientPkh = lucid.utils.getAddressDetails(recipientAddr).paymentCredential.hash;
  } catch (error) {
    log("Invalid recipient address format", "error");
    return;
  }
  
  const intervalSeconds = intervalDays * 86400n;
  const now = BigInt(Math.floor(Date.now() / 1000));
  const nextPayment = now + intervalSeconds;
  
  const datum = mkRecurringDatum(
    payerPkh,
    recipientPkh,
    amountAda,
    intervalSeconds,
    nextPayment
  );
  
  log(`Creating subscription: ${subscriptionName}`, "info");
  
  const tx = await lucid
    .newTx()
    .payToContract(
      scriptAddress,
      { inline: datum },
      { lovelace: amountAda * 12n } // fund 12 cycles
    )
    .addSignerKey(payerPkh)
    .complete();
  
  const signed = await tx.sign().complete();
  const txHash = await signed.submit();
  
  log(`"${subscriptionName}" subscription created! TX: ${txHash.substring(0, 16)}...`, "success");
  
  // UPDATE SUBSCRIPTIONS LIST
  await loadAndUpdateSubscriptions();
  
  // Clear form fields
  document.getElementById("subscriptionName").value = "";
  document.getElementById("subscriptionDescription").value = "";
  document.getElementById("recipient").value = "";
  document.getElementById("amount").value = "";
}

/* =====================================================
   EXECUTE SINGLE PAYMENT
===================================================== */

async function executeSinglePayment(index) {
  if (index < 0 || index >= subscriptions.length) {
    log("Invalid subscription index", "error");
    return;
  }
  
  const sub = subscriptions[index];
  const d = sub.datum;
  
  const newDatum = mkRecurringDatum(
    d.rdPayer,
    d.rdRecipient,
    d.rdAmount,
    d.rdInterval,
    d.rdNextPayment + d.rdInterval
  );
  
  const recipientAddress = lucid.utils.credentialToAddress({
    type: "Key",
    hash: d.rdRecipient,
  });
  
  log(`Executing payment for subscription...`, "info");
  
  const tx = await lucid
    .newTx()
    .collectFrom([sub.utxo], payRedeemer)
    .attachSpendingValidator(script)
    .payToAddress(recipientAddress, { lovelace: d.rdAmount })
    .payToContract(
      scriptAddress,
      { inline: newDatum },
      { lovelace: BigInt(sub.utxo.assets.lovelace) - d.rdAmount }
    )
    .complete();
  
  const signed = await tx.sign().complete();
  const txHash = await signed.submit();
  
  log(`Payment executed! TX: ${txHash.substring(0, 16)}...`, "success");
  
  // UPDATE SUBSCRIPTIONS LIST AFTER PAYMENT
  await loadAndUpdateSubscriptions();
}

/* =====================================================
   CANCEL SINGLE SUBSCRIPTION
===================================================== */

async function cancelSingleSubscription(index) {
  if (index < 0 || index >= subscriptions.length) {
    log("Invalid subscription index", "error");
    return;
  }
  
  const sub = subscriptions[index];
  const payerPkh = lucid.utils.getAddressDetails(walletAddress).paymentCredential.hash;
  
  if (!confirm("Are you sure you want to cancel this subscription?")) {
    return;
  }
  
  log(`Cancelling subscription...`, "info");
  
  const tx = await lucid
    .newTx()
    .collectFrom([sub.utxo], cancelRedeemer)
    .attachSpendingValidator(script)
    .addSignerKey(payerPkh)
    .complete();
  
  const signed = await tx.sign().complete();
  const txHash = await signed.submit();
  
  log(`Subscription cancelled! TX: ${txHash.substring(0, 16)}...`, "success");
  
  // UPDATE SUBSCRIPTIONS LIST AFTER CANCELLATION
  await loadAndUpdateSubscriptions();
}

/* =====================================================
   OLD FUNCTIONS (for backward compatibility)
===================================================== */

async function executePayment() {
  // Execute payment for the first subscription (backward compatibility)
  if (subscriptions.length > 0) {
    await executeSinglePayment(0);
  } else {
    log("No subscriptions found", "error");
  }
}

async function cancelRecurring() {
  // Cancel the first subscription (backward compatibility)
  if (subscriptions.length > 0) {
    await cancelSingleSubscription(0);
  } else {
    log("No subscriptions found", "error");
  }
}

/* =====================================================
   UI
===================================================== */

function log(msg, type = "info") {
  const logContainer = document.getElementById("log");
  
  // Get current time
  const time = new Date().toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
  
  // Create a new log entry
  const logEntry = document.createElement("div");
  logEntry.className = "log-entry";
  
  let typeClass = "log-message";
  switch(type) {
    case "success": typeClass = "log-success"; break;
    case "error": typeClass = "log-error"; break;
    case "warning": typeClass = "log-warning"; break;
  }
  
  logEntry.innerHTML = `
    <span class="log-time">${time}</span>
    <span class="${typeClass}">${msg}</span>
  `;
  
  // Add to the log container (append, don't replace)
  logContainer.appendChild(logEntry);
  
  // Scroll to bottom
  logContainer.scrollTop = logContainer.scrollHeight;
}

// Make functions globally available for onclick events
window.executeSinglePayment = executeSinglePayment;
window.cancelSingleSubscription = cancelSingleSubscription;

// Event listeners
document.getElementById("connect").onclick = init;
document.getElementById("create").onclick = createRecurringPayment;
document.getElementById("pay").onclick = executePayment;
document.getElementById("cancel").onclick = cancelRecurring;

// Add clear log functionality for your HTML button
document.getElementById("clearLog").onclick = function() {
  const logContainer = document.getElementById("log");
  logContainer.innerHTML = `
    <div class="log-entry">
      <span class="log-time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
      <span class="log-message">Log cleared</span>
    </div>
  `;
};

// Add custom interval toggle (for your dropdown)
document.getElementById("interval").addEventListener("change", function() {
  const customContainer = document.getElementById("customIntervalContainer");
  if (this.value === "custom") {
    customContainer.style.display = "block";
  } else {
    customContainer.style.display = "none";
  }
});