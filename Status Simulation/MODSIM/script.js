const getReq = (val) => Math.floor((val - 1) / 10) + 2;

let lastValidStats = { str: 1, agi: 1, vit: 1, int: 1, dex: 1, luk: 1, baseLv: 1 };

function update() {
    const lvInput = document.getElementById('baseLv');
    let lv = parseInt(lvInput.value) || 1;

    if (lv > 99) {
        lv = 99;
        lvInput.value = 99;
    }

    const stats = {
        str: parseInt(document.getElementById('str').value) || 1,
        agi: parseInt(document.getElementById('agi').value) || 1,
        vit: parseInt(document.getElementById('vit').value) || 1,
        int: parseInt(document.getElementById('int').value) || 1,
        dex: parseInt(document.getElementById('dex').value) || 1,
        luk: parseInt(document.getElementById('luk').value) || 1
    };

    for (let key in stats) {
        if (stats[key] > 99) {
            stats[key] = 99;
            document.getElementById(key).value = 99;
        }
    }

    let totalPts = 48;
    for (let i = 1; i < lv; i++) totalPts += Math.floor(i / 5) + 3;

    let spent = 0;
    for (let key in stats) {
        for (let v = 1; v < stats[key]; v++) {
            spent += getReq(v);
        }
    }

    let remaining = totalPts - spent;

    if (remaining < 0) {
        for (let key in lastValidStats) {
            document.getElementById(key).value = lastValidStats[key];
        }
        update();
        return;
    }

    lastValidStats = { ...stats, baseLv: lv };

    const ptsDisplay = document.getElementById('pts_val');
    ptsDisplay.innerText = remaining;

    // Update REQ and Progress Bars
    for (let key in stats) {
        document.getElementById(`req_${key}`).innerText = getReq(stats[key]);
        // Update the visual bar width (1% to 100%)
        document.getElementById(`bar_${key}`).style.width = `${stats[key]}%`;
    }

    // Formulas
    const strSquareBonus = Math.pow(Math.floor(stats.str / 10), 2);
    const atkBase = stats.str + strSquareBonus + Math.floor(stats.dex / 5) + Math.floor(stats.luk / 3);
    document.getElementById('atk_val').innerText = `${atkBase} + 0`;

    const matkMin = stats.int + Math.pow(Math.floor(stats.int / 7), 2);
    const matkMax = stats.int + Math.pow(Math.floor(stats.int / 5), 2);
    document.getElementById('matk_val').innerText = `${matkMin} - ${matkMax}`;

    document.getElementById('def_val').innerText = `0 + ${stats.vit}`;
    document.getElementById('mdef_val').innerText = `0 + ${stats.int}`;
    document.getElementById('hit_val').innerText = lv + stats.dex;

    const dodgeBonus = Math.floor(stats.luk / 10) + 1;
    document.getElementById('flee_val').innerText = `${lv + stats.agi} + ${dodgeBonus}`;
    document.getElementById('crit_val').innerText = Math.floor(stats.luk * 0.3) + 1;

    const aspdBase = 150 + (stats.agi * 4 + stats.dex) / 20;
    document.getElementById('aspd_val').innerText = Math.floor(aspdBase);

    // Animation
    ptsDisplay.classList.remove('glitch-trigger');
    void ptsDisplay.offsetWidth;
    ptsDisplay.classList.add('glitch-trigger');
    ptsDisplay.style.color = (remaining === 0) ? "#508a91" : "#fff";
}

update();