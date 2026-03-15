 // ========== 患者数据 ==========
const patients = [
    {
        id: 1,
        name: '张敏',
        age: 32,
        weeks: 32,
        riskLevel: 'high',
        riskScore: 78,
        factors: [
            { name: '宫颈长度', value: '25mm', contribution: 40 },
            { name: '空腹血糖', value: '5.3mmol/L', contribution: 28 },
            { name: '既往早产史', value: '有', contribution: 17 }
        ],
        advice: {
            recheck: ['每周复查宫颈长度', '3天后复查空腹血糖'],
            lifestyle: ['卧床休息', '控制碳水化合物摄入', '每日监测胎动'],
            warning: ['规律宫缩立即就医', '阴道流血立即就医']
        },
        // 张敏有污染物数据
        pollutants: {
            bloodMetals: {
                Cd: { value: 0.96, ref: '<2.0', lod: 0.05 },
                Cr: { value: 2.3, ref: '<5.0', lod: 0.1 },
                Ni: { value: 1.8, ref: '<4.0', lod: 0.1 },
                Co: { value: 0.9, ref: '<1.5', lod: 0.05 },
                Pb: { value: 12.5, ref: '<50', lod: 0.5 },
                As: { value: 8.2, ref: '<15', lod: 0.5 },
                Hg: { value: 1.1, ref: '<5.0', lod: 0.2 },
                Se: { value: 80, ref: '70-150', lod: 5 },
                Zn: { value: 1200, ref: '700-1500', lod: 20 },
                Mn: { value: 15.0, ref: '8-20', lod: 0.5 },
                Fe: { value: 450, ref: '400-600', lod: 10 },
                Cu: { value: 1300, ref: '800-1500', lod: 10 },
                Mo: { value: 5.2, ref: '1-8', lod: 0.2 }
            },
            bisphenols: {
                BPA: { value: 5262, ref: '<5000', lod: 1 },
                BPB: { value: 2.1, ref: '<10', lod: 0.5 },
                BPF: { value: 3.5, ref: '<10', lod: 0.5 },
                BPE: { value: 1.2, ref: '<5', lod: 0.2 },
                BPS: { value: 2.1, ref: '<10', lod: 0.5 },
                BPP: { value: 0.8, ref: '<5', lod: 0.2 }
            },
        pfas: {
            PFOA: { value: 2.8, ref: '<5', lod: 0.1 },
            PFDOA: { value: 3.32, ref: '<10', lod: 0.2 },
            PFBA: { value: 0.9, ref: '<5', lod: 0.1 },
            PFHPA: { value: 1.5, ref: '<5', lod: 0.1 },
            PFHXA: { value: 0.7, ref: '<3', lod: 0.1 },
            'L-PFBS': { value: 1.1, ref: '<5', lod: 0.1 },
            PFOSK: { value: 1.6, ref: '<5', lod: 0.1 },
            '6-2FTS': { value: 0.5, ref: '<2', lod: 0.1 }
        }
    },
        // 新增血清学指标
            serumMarkers: {
                hCG: { value: 25000, ref: '20000-50000', unit: 'mIU/mL' },
                PAPP_A: { value: 2.5, ref: '1.0-3.0', unit: 'mIU/mL' },
                AFP: { value: 35, ref: '20-50', unit: 'ng/mL' },
                uE3: { value: 1.2, ref: '0.5-2.0', unit: 'ng/mL' },
                InhibinA: { value: 150, ref: '100-300', unit: 'pg/mL' },
                PlGF: { value: 120, ref: '80-200', unit: 'pg/mL' },
                sFlt1: { value: 2500, ref: '1500-4000', unit: 'pg/mL' }
      }
    },
    {
        id: 2,
        name: '李芳',
        age: 28,
        weeks: 28,
        riskLevel: 'mid',
        riskScore: 55,
        factors: [
            { name: 'OGTT异常', value: '空腹5.8', contribution: 45 },
            { name: 'BMI', value: '28.5', contribution: 30 },
            { name: '年龄', value: '28岁', contribution: 10 }
        ],
        advice: {
            recheck: ['下周OGTT复查', '每月糖化血红蛋白'],
            lifestyle: ['饮食控制', '每日散步30分钟'],
            warning: ['多饮多尿及时咨询']
        }
        // 没有 pollutants，详情页会显示无数据
    },
    {
        id: 3,
        name: '王丽',
        age: 26,
        weeks: 35,
        riskLevel: 'low',
        riskScore: 25,
        factors: [
            { name: '无显著异常', value: '-', contribution: 0 }
        ],
        advice: {
            recheck: ['常规产检'],
            lifestyle: ['正常活动', '均衡营养'],
            warning: ['无特殊预警']
        }
    },
    {
        id: 4,
        name: '赵雪',
        age: 35,
        weeks: 30,
        riskLevel: 'high',
        riskScore: 82,
        factors: [
            { name: '血压偏高', value: '145/95', contribution: 50 },
            { name: '尿蛋白', value: '+', contribution: 30 },
            { name: '高龄', value: '35岁', contribution: 15 }
        ],
        advice: {
            recheck: ['每日血压监测', '每周尿蛋白检查'],
            lifestyle: ['低盐饮食', '左侧卧位休息'],
            warning: ['头痛眼花立即就医']
        }
    }
];

// ========== 渲染函数 ==========
function updateStats() {
    // 设置你想要的演示数字
    const total = 5842;    // 总管理人数
    const high = 367;      // 高风险
    const mid = 892;       // 中风险
    const low = 4583;      // 低风险

    document.getElementById('totalCount').innerText = total;
    document.getElementById('highCount').innerText = high;
    document.getElementById('midCount').innerText = mid;
    document.getElementById('lowCount').innerText = low;
}

function renderPatientList() {
    const listContainer = document.getElementById('patientList');
    listContainer.innerHTML = '';
    patients.forEach(p => {
        let riskColor = '';
        if (p.riskLevel === 'high') riskColor = 'bg-danger';
        else if (p.riskLevel === 'mid') riskColor = 'bg-warning';
        else riskColor = 'bg-success';
        
        let riskText = p.riskLevel === 'high' ? '高风险' : (p.riskLevel === 'mid' ? '中风险' : '低风险');
        
        const item = document.createElement('a');
        item.href = '#';
        item.className = 'list-group-item list-group-item-action patient-item';
        item.setAttribute('data-id', p.id);
        item.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <span class="risk-badge ${riskColor}"></span>
                    <strong>${p.name}</strong> · ${p.age}岁 · 孕${p.weeks}周
                </div>
                <div>
                    <span class="risk-${p.riskLevel}">${riskText}</span>
                    <small class="text-muted ms-3">风险指数 ${p.riskScore}</small>
                </div>
            </div>
            <div class="mt-1 text-muted small">主要因素: ${p.factors.map(f => f.name).join(' · ')}</div>
        `;
        item.addEventListener('click', (e) => {
            e.preventDefault();
            showDetailPage(p.id);
        });
        listContainer.appendChild(item);
    });
}

function showDetailPage(patientId) {
    const patient = patients.find(p => p.id === patientId);
    if (!patient) return;

    // 基本信息
    document.getElementById('detailName').innerText = `${patient.name} · ${patient.age}岁 · 孕${patient.weeks}周`;
    document.getElementById('detailAge').innerText = patient.age;
    document.getElementById('detailWeeks').innerText = patient.weeks;
    document.getElementById('detailScore').innerText = patient.riskScore;

    // 风险等级标签
    let riskTag = '', riskClass = '';
    if (patient.riskLevel === 'high') {
        riskTag = '高风险'; riskClass = 'risk-high';
    } else if (patient.riskLevel === 'mid') {
        riskTag = '中风险'; riskClass = 'risk-mid';
    } else {
        riskTag = '低风险'; riskClass = 'risk-low';
    }
    document.getElementById('detailRiskTag').innerHTML = `<span class="${riskClass}">${riskTag}</span>`;
    
    // 风险进度条
    const progressBar = document.getElementById('detailProgress');
    progressBar.style.width = patient.riskScore + '%';
    progressBar.className = 'progress-bar';
    if (patient.riskLevel === 'high') progressBar.classList.add('bg-danger');
    else if (patient.riskLevel === 'mid') progressBar.classList.add('bg-warning');
    else progressBar.classList.add('bg-success');

    // 主要风险因素
    const factorList = document.getElementById('detailFactors');
    factorList.innerHTML = '';
    patient.factors.forEach(f => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `${f.name}: ${f.value} <span class="badge bg-primary rounded-pill">贡献度 ${f.contribution}%</span>`;
        factorList.appendChild(li);
    });

    // 干预建议
    document.getElementById('adviceRecheck').innerHTML = patient.advice.recheck.map(item => `<li>${item}</li>`).join('');
    document.getElementById('adviceLifestyle').innerHTML = patient.advice.lifestyle.map(item => `<li>${item}</li>`).join('');
    document.getElementById('adviceWarning').innerHTML = patient.advice.warning.map(item => `<li class="text-danger">${item}</li>`).join('');

    // ========== 污染物数据（带参考范围和检出限） ==========
    if (patient.pollutants) {
        // 全血金属
        const bloodMetals = patient.pollutants.bloodMetals;
        let bloodHtml = '';
        for (let [el, data] of Object.entries(bloodMetals)) {
            bloodHtml += `<tr><td>${el}</td><td>${data.value}</td><td>${data.ref}</td><td>${data.lod}</td></tr>`;
        }
        document.getElementById('bloodMetalsList').innerHTML = bloodHtml;

        // 双酚类
        const bisphenols = patient.pollutants.bisphenols;
        let bpaHtml = '';
        for (let [comp, data] of Object.entries(bisphenols)) {
            bpaHtml += `<tr><td>${comp}</td><td>${data.value}</td><td>${data.ref}</td><td>${data.lod}</td></tr>`;
        }
        document.getElementById('bisphenolsList').innerHTML = bpaHtml;

        // 全氟化合物
        const pfas = patient.pollutants.pfas;
        let pfasHtml = '';
        for (let [comp, data] of Object.entries(pfas)) {
            pfasHtml += `<tr><td>${comp}</td><td>${data.value}</td><td>${data.ref}</td><td>${data.lod}</td></tr>`;
        }
        document.getElementById('pfasList').innerHTML = pfasHtml;
    } else {
        document.getElementById('bloodMetalsList').innerHTML = '<tr><td colspan="4" class="text-center">无数据</td></tr>';
        document.getElementById('bisphenolsList').innerHTML = '<tr><td colspan="4" class="text-center">无数据</td></tr>';
        document.getElementById('pfasList').innerHTML = '<tr><td colspan="4" class="text-center">无数据</td></tr>';
    }

    // ========== 血清学及蛋白质指标 ==========
    if (patient.serumMarkers) {
        const markers = patient.serumMarkers;
        let markersHtml = '';
        for (let [name, data] of Object.entries(markers)) {
            // 将键名转换为友好的显示名称
            let displayName = name;
            if (name === 'hCG') displayName = '人绒毛膜促性腺激素 (hCG)';
            else if (name === 'PAPP_A') displayName = '妊娠相关血浆蛋白A (PAPP-A)';
            else if (name === 'AFP') displayName = '甲胎蛋白 (AFP)';
            else if (name === 'uE3') displayName = '游离雌三醇 (uE3)';
            else if (name === 'InhibinA') displayName = '抑制素A';
            else if (name === 'PlGF') displayName = '胎盘生长因子 (PlGF)';
            else if (name === 'sFlt1') displayName = '可溶性Fms样酪氨酸激酶1 (sFlt-1)';
            markersHtml += `<tr><td>${displayName}</td><td>${data.value}</td><td>${data.ref}</td><td>${data.unit}</td></tr>`;
        }
        document.getElementById('serumMarkersList').innerHTML = markersHtml;
    } else {
        document.getElementById('serumMarkersList').innerHTML = '<tr><td colspan="4" class="text-center">无数据</td></tr>';
    }

    // 切换页面显示
    document.getElementById('listPage').style.display = 'none';
    document.getElementById('detailPage').style.display = 'block';
}
// ========== 登录交互 ==========
document.addEventListener('DOMContentLoaded', function() {
    updateStats();
    renderPatientList();
    document.getElementById('backToList').addEventListener('click', backToList);

    const loginPage = document.getElementById('loginPage');
    const mainApp = document.getElementById('mainApp');
    const loginBtn = document.getElementById('loginBtn');
    const doctorIdInput = document.getElementById('doctorId');
    const passwordInput = document.getElementById('password');

    const validAccounts = [
        { id: '2023542080', pwd: '123456' },
        { id: '2023542025', pwd: '123456' },
        { id: '2023542071', pwd: '123456' },
        { id: '2023542101', pwd: '123456' }
    ];

    function validateLogin(doctorId, password) {
        return validAccounts.some(account => account.id === doctorId && account.pwd === password);
    }

    loginBtn.addEventListener('click', function() {
        const doctorId = doctorIdInput.value.trim();
        const password = passwordInput.value.trim();

        if (doctorId === '' || password === '') {
            alert('请输入工号和密码');
            return;
        }

        if (validateLogin(doctorId, password)) {
            loginPage.style.display = 'none';
            mainApp.style.display = 'block';
        } else {
            alert('工号或密码错误');
        }
    });

    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') loginBtn.click();
    });
});