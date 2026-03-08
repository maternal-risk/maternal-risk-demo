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
    let high = patients.filter(p => p.riskLevel === 'high').length;
    let mid = patients.filter(p => p.riskLevel === 'mid').length;
    let low = patients.filter(p => p.riskLevel === 'low').length;
    document.getElementById('totalCount').innerText = patients.length;
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

    document.getElementById('detailName').innerText = `${patient.name} · ${patient.age}岁 · 孕${patient.weeks}周`;
    document.getElementById('detailAge').innerText = patient.age;
    document.getElementById('detailWeeks').innerText = patient.weeks;
    document.getElementById('detailScore').innerText = patient.riskScore;

    let riskTag = '';
    let riskClass = '';
    if (patient.riskLevel === 'high') {
        riskTag = '高风险';
        riskClass = 'risk-high';
    } else if (patient.riskLevel === 'mid') {
        riskTag = '中风险';
        riskClass = 'risk-mid';
    } else {
        riskTag = '低风险';
        riskClass = 'risk-low';
    }
    document.getElementById('detailRiskTag').innerHTML = `<span class="${riskClass}">${riskTag}</span>`;
    
    const progressBar = document.getElementById('detailProgress');
    progressBar.style.width = patient.riskScore + '%';
    progressBar.className = 'progress-bar';
    if (patient.riskLevel === 'high') progressBar.classList.add('bg-danger');
    else if (patient.riskLevel === 'mid') progressBar.classList.add('bg-warning');
    else progressBar.classList.add('bg-success');

    const factorList = document.getElementById('detailFactors');
    factorList.innerHTML = '';
    patient.factors.forEach(f => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `${f.name}: ${f.value} <span class="badge bg-primary rounded-pill">贡献度 ${f.contribution}%</span>`;
        factorList.appendChild(li);
    });

    document.getElementById('adviceRecheck').innerHTML = patient.advice.recheck.map(item => `<li>${item}</li>`).join('');
    document.getElementById('adviceLifestyle').innerHTML = patient.advice.lifestyle.map(item => `<li>${item}</li>`).join('');
    document.getElementById('adviceWarning').innerHTML = patient.advice.warning.map(item => `<li class="text-danger">${item}</li>`).join('');

    document.getElementById('listPage').style.display = 'none';
    document.getElementById('detailPage').style.display = 'block';
}

function backToList() {
    document.getElementById('listPage').style.display = 'block';
    document.getElementById('detailPage').style.display = 'none';
}

// ========== 登录交互 ==========
document.addEventListener('DOMContentLoaded', function() {
    // 初始化患者列表
    updateStats();
    renderPatientList();
    document.getElementById('backToList').addEventListener('click', backToList);

    // 登录相关
    const loginPage = document.getElementById('loginPage');
    const mainApp = document.getElementById('mainApp');
    const loginBtn = document.getElementById('loginBtn');
    const doctorIdInput = document.getElementById('doctorId');
    const passwordInput = document.getElementById('password');

    const validAccounts = [
        { id: '2023542080', pwd: '123456' }
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
            alert('工号或密码错误，请重试（演示账号：1001/1002，密码123456）');
        }
    });

    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            loginBtn.click();
        }
    });
});