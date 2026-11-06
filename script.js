/* ============================================
   Portfolio JavaScript - Cyberpunk Edition
   - Typing effect & stat count-up
   - Smooth scrolling & navigation
   - Scroll-triggered animations
   - Interactive terminal contact (send flow)
   - Web3Forms email handling (terminal + form)
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    document.documentElement.classList.add('js');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const PROFILE = {
        name: '이오리',
        nameEn: 'Lee Ori',
        role: 'Business-Minded Developer',
        email: 'leeori.dev@gmail.com',
        phone: '010-1234-5678',
        github: 'https://github.com/fsclass-n',
        major: '한국 오리대학교 경영학과 (2024. 02 졸업, GPA 3.87/4.5)'
    };

    // --- Typing Effect ---
    const titles = [
        'Data-Driven Builder',
        'Business-Minded Developer',
        'Full Stack Engineer',
        'Growth Problem Solver'
    ];
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const dynamicTitle = document.getElementById('dynamicTitle');

    function typeEffect() {
        const currentTitle = titles[titleIndex];
        dynamicTitle.textContent = currentTitle.substring(0, isDeleting ? charIndex - 1 : charIndex + 1);
        charIndex += isDeleting ? -1 : 1;

        let typeSpeed = isDeleting ? 35 : 75;
        if (!isDeleting && charIndex === currentTitle.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            typeSpeed = 450;
        }
        setTimeout(typeEffect, typeSpeed);
    }

    if (!reducedMotion) typeEffect();

    // --- Stat Count-up ---
    function countUp(el) {
        const target = Number(el.dataset.count);
        const duration = 1200;
        const start = performance.now();
        const format = (n) => n.toLocaleString('ko-KR');
        function frame(now) {
            const progress = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = format(Math.round(target * eased));
            if (progress < 1) requestAnimationFrame(frame);
        }
        requestAnimationFrame(frame);
    }

    if (!reducedMotion) {
        document.querySelectorAll('.stat-value[data-count]').forEach((el) => {
            el.textContent = '0';
            setTimeout(() => countUp(el), 900);
        });
    }

    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const progress = document.getElementById('scrollProgress');
    const topButton = document.getElementById('topButton');

    function handleScroll() {
        const scrollY = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.width = `${maxScroll > 0 ? Math.min(100, scrollY / maxScroll * 100) : 0}%`;
        topButton.hidden = scrollY < 500;
        navbar.classList.toggle('scrolled', scrollY > 50);

        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (scrollY >= sectionTop && scrollY < sectionTop + section.offsetHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            const active = link.getAttribute('data-section') === currentSection;
            link.classList.toggle('active', active);
            if (active) link.setAttribute('aria-current', 'location');
            else link.removeAttribute('aria-current');
        });
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    // --- Mobile Navigation ---
    const navToggle = document.getElementById('navToggle');
    const navLinksContainer = document.getElementById('navLinks');

    function setMenuOpen(open) {
        navToggle.classList.toggle('active', open);
        navToggle.setAttribute('aria-expanded', String(open));
        navToggle.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
        navLinksContainer.classList.toggle('open', open);
        document.body.style.overflow = open ? 'hidden' : '';
    }

    navToggle.addEventListener('click', () => setMenuOpen(!navLinksContainer.classList.contains('open')));
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && navLinksContainer.classList.contains('open')) {
            setMenuOpen(false);
            navToggle.focus();
        }
    });
    document.addEventListener('click', (event) => {
        if (!navbar.contains(event.target)) setMenuOpen(false);
    });
    navbar.addEventListener('focusout', (event) => {
        if (!navbar.contains(event.relatedTarget)) setMenuOpen(false);
    });
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) setMenuOpen(false);
        handleScroll();
    });
    navLinksContainer.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => setMenuOpen(false));
    });

    // --- Smooth Scrolling ---
    function scrollToTarget(selector) {
        const target = document.querySelector(selector);
        if (!target) return;
        const offsetTop = target.getBoundingClientRect().top + window.scrollY - navbar.offsetHeight;
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
        window.scrollTo({ top: offsetTop, behavior: reducedMotion ? 'auto' : 'smooth' });
        history.pushState(null, '', selector);
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            scrollToTarget(this.getAttribute('href'));
        });
    });

    // --- Scroll-Triggered Animations ---
    if ('IntersectionObserver' in window && !reducedMotion) {
        document.documentElement.classList.add('motion-ready');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const delay = entry.target.closest('.about-cards, .skills-grid, .portfolio-grid')
                    ? Array.from(entry.target.parentElement.children).indexOf(entry.target) * 120
                    : 0;
                setTimeout(() => entry.target.classList.add('visible'), delay);
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));
    }

    // --- Parallax for hero glow shapes ---
    if (!reducedMotion && window.matchMedia('(pointer: fine)').matches) {
        const shapes = document.querySelectorAll('.shape');
        window.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 2;
            const y = (e.clientY / window.innerHeight - 0.5) * 2;
            shapes.forEach((shape, i) => {
                const speed = (i + 1) * 10;
                shape.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
            });
        }, { passive: true });
    }

    // ============================================
    // Web3Forms submission (shared by terminal + form)
    // ============================================
    const contactForm = document.getElementById('contactForm');
    const accessKey = contactForm.elements.access_key.value;

    async function submitMessage(payload) {
        const controller = new AbortController();
        const timeout = window.setTimeout(() => controller.abort(), 20000);
        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({
                    access_key: accessKey,
                    from_name: `${PROFILE.name} 포트폴리오`,
                    subject: `[${PROFILE.name} 포트폴리오] ${payload.title.trim()}`,
                    replyto: payload.email,
                    name: payload.name,
                    email: payload.email,
                    phone: payload.phone || '',
                    title: payload.title,
                    message: payload.message,
                    channel: payload.channel
                }),
                signal: controller.signal
            });
            const result = await response.json();
            if (!(response.ok && result.success === true)) {
                throw new Error(result.message || 'Form submission failed');
            }
            return true;
        } finally {
            window.clearTimeout(timeout);
        }
    }

    // ============================================
    // Contact mode switch (terminal <-> form)
    // ============================================
    const modeTerminal = document.getElementById('modeTerminal');
    const modeForm = document.getElementById('modeForm');
    const terminalPanel = document.getElementById('terminalPanel');
    const formPanel = document.getElementById('formPanel');

    function setMode(mode) {
        const isTerminal = mode === 'terminal';
        terminalPanel.hidden = !isTerminal;
        formPanel.hidden = isTerminal;
        modeTerminal.classList.toggle('active', isTerminal);
        modeForm.classList.toggle('active', !isTerminal);
        modeTerminal.setAttribute('aria-selected', String(isTerminal));
        modeForm.setAttribute('aria-selected', String(!isTerminal));
    }

    modeTerminal.addEventListener('click', () => setMode('terminal'));
    modeForm.addEventListener('click', () => {
        setMode('form');
        contactForm.elements.name.focus({ preventScroll: true });
    });

    // ============================================
    // Interactive terminal
    // ============================================
    const screen = document.getElementById('terminalScreen');
    const output = document.getElementById('terminalOutput');
    const termForm = document.getElementById('terminalForm');
    const termInput = document.getElementById('terminalInput');
    const termPrompt = document.getElementById('terminalPrompt');
    const DEFAULT_PROMPT = 'ori@portfolio:~$';
    const history = [];
    let historyIndex = 0;
    let busy = false;

    // Guided "send" flow state
    const SEND_STEPS = [
        { key: 'name', prompt: 'name>', ask: '이름 또는 회사명을 입력해 주세요.', validate: (v) => v.length >= 1 && v.length <= 100 || '1~100자로 입력해 주세요.' },
        { key: 'email', prompt: 'email>', ask: '회신받을 이메일을 입력해 주세요.', validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || '이메일 형식이 올바르지 않습니다. 예) recruiter@company.com' },
        { key: 'title', prompt: 'subject>', ask: '제목을 입력해 주세요. 예) [면접 제안] 데이터 분석 포지션', validate: (v) => v.length >= 2 && v.length <= 200 || '2~200자로 입력해 주세요.' },
        { key: 'message', prompt: 'message>', ask: '메시지를 입력해 주세요. (포지션 · 일정 · 궁금한 점)', validate: (v) => v.length >= 5 && v.length <= 10000 || '5자 이상 입력해 주세요.' },
        { key: 'confirm', prompt: 'confirm (y/n)>', ask: null, validate: (v) => /^(y|yes|n|no)$/i.test(v) || 'y 또는 n을 입력해 주세요.' }
    ];
    let send = null; // { step: number, data: {} }

    function escapeHTML(str) {
        return String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    }

    function print(html, cls = '') {
        const line = document.createElement('div');
        line.className = `line ${cls}`.trim();
        line.innerHTML = html;
        output.appendChild(line);
        screen.scrollTop = screen.scrollHeight;
        return line;
    }

    function printCmd(text, promptText = DEFAULT_PROMPT) {
        print(`<span class="t-prompt">${escapeHTML(promptText)}</span>${escapeHTML(text)}`, 'line-cmd');
    }

    function printLines(lines, cls = '') {
        lines.forEach((l) => print(l, cls));
    }

    function setPrompt(text, isSend) {
        termPrompt.textContent = text;
        termPrompt.classList.toggle('prompt-send', Boolean(isSend));
        termInput.placeholder = isSend ? '입력 후 Enter (취소: cancel)' : 'help 입력 후 Enter';
    }

    async function copyText(text) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (e) {
            return false;
        }
    }

    const commands = {
        help() {
            print('available commands:', 'line-title');
            printLines([
                `  <span class="cmd-name">help</span>    명령어 목록 보기`,
                `  <span class="cmd-name">whoami</span>  이오리 한 줄 소개`,
                `  <span class="cmd-name">email</span>   이메일 주소 복사 + 메일 앱 열기`,
                `  <span class="cmd-name">phone</span>   전화번호 표시 (모바일에서는 바로 통화)`,
                `  <span class="cmd-name">github</span>  GitHub 프로필 열기`,
                `  <span class="cmd-name">resume</span>  핵심 역량 · 학력 요약`,
                `  <span class="cmd-name">send</span>    면접 제안 · 문의 메시지 보내기 (대화형)`,
                `  <span class="cmd-name">clear</span>   화면 지우기`
            ]);
            print('tip: 버튼(chip)을 눌러도 같은 명령이 실행됩니다.', 'line-dim');
        },
        whoami() {
            print(`${PROFILE.name} <span class="t-dim">/ ${PROFILE.nameEn}</span> — ${PROFILE.role}`, 'line-ok');
            print('경영학으로 문제를 정의하고, 데이터로 전략을 검증하고, 코드로 서비스를 배포합니다.');
        },
        async email() {
            const copied = await copyText(PROFILE.email);
            print(`email: <a href="mailto:${PROFILE.email}">${PROFILE.email}</a>${copied ? ' <span class="t-dim">(클립보드에 복사됨)</span>' : ''}`, 'line-ok');
            print('메일 앱을 여는 중... 열리지 않으면 위 주소를 클릭해 주세요.', 'line-dim');
            window.location.href = `mailto:${PROFILE.email}?subject=${encodeURIComponent(`[면접 제안] ${PROFILE.name}님께`)}`;
        },
        async phone() {
            const copied = await copyText(PROFILE.phone);
            print(`phone: <a href="tel:${PROFILE.phone.replace(/-/g, '')}">${PROFILE.phone}</a>${copied ? ' <span class="t-dim">(클립보드에 복사됨)</span>' : ''}`, 'line-ok');
            print('평일 09:00–20:00 통화 가능 · 부재 시 문자 남겨 주시면 회신드립니다.', 'line-dim');
        },
        github() {
            print(`opening <a href="${PROFILE.github}" target="_blank" rel="noopener noreferrer">${PROFILE.github}</a> ...`, 'line-ok');
            window.open(PROFILE.github, '_blank', 'noopener');
        },
        resume() {
            print('resume.txt', 'line-title');
            printLines([
                `  EDU      ${escapeHTML(PROFILE.major)}`,
                '  COURSES  경영전략 · 경영통계 · 마케팅조사론 · MIS · 재무관리',
                '  TRAIN    빅데이터 분석 &amp; 자동화 1,000h · 풀스택 &amp; AWS 심화 348h',
                '  STACK    Python · pandas · scikit-learn · Spring Boot · FastAPI · React · SQL',
                '  SHIPPED  Nomadpick · Picktiming · Homepick · Portfolio (4 live services)',
                '  IMPACT   특가 비교 시간 -95% · 가격 이력 중복 0건 · CI 빌드 검증 100%'
            ]);
        },
        send() {
            send = { step: 0, data: {} };
            print('== 메시지 전송 모드 == 질문에 차례대로 답해 주세요. 취소: cancel', 'line-warn');
            print(SEND_STEPS[0].ask, 'line-dim');
            setPrompt(SEND_STEPS[0].prompt, true);
        },
        clear() {
            output.innerHTML = '';
        },
        cancel() {
            print('취소할 작업이 없습니다.', 'line-dim');
        }
    };

    const aliases = { ls: 'help', '?': 'help', mail: 'email', contact: 'send', hire: 'send', message: 'send', tel: 'phone', cv: 'resume', cls: 'clear', exit: 'clear' };

    function endSend() {
        send = null;
        setPrompt(DEFAULT_PROMPT, false);
    }

    async function handleSendInput(raw) {
        const value = raw.trim();
        const step = SEND_STEPS[send.step];
        printCmd(raw, step.prompt);

        if (/^cancel$/i.test(value)) {
            print('메시지 전송을 취소했습니다.', 'line-warn');
            endSend();
            return;
        }

        const valid = step.validate(value);
        if (valid !== true) {
            print(`! ${valid}`, 'line-err');
            return;
        }

        if (step.key === 'confirm') {
            if (/^n/i.test(value)) {
                print('전송을 취소했습니다. 다시 보내려면 send 를 입력하세요.', 'line-warn');
                endSend();
                return;
            }
            busy = true;
            termInput.disabled = true;
            const pending = print('sending message via Web3Forms ...', 'line-dim');
            try {
                await submitMessage({ ...send.data, channel: 'terminal' });
                pending.remove();
                print('✔ MESSAGE SENT — 빠른 시일 내에 답변 드리겠습니다. 감사합니다!', 'line-ok');
            } catch (e) {
                pending.remove();
                print(`✘ 전송에 실패했습니다. <a href="mailto:${PROFILE.email}">이메일로 직접 연락</a>하거나 잠시 후 다시 시도해 주세요.`, 'line-err');
            } finally {
                busy = false;
                termInput.disabled = false;
                endSend();
                termInput.focus({ preventScroll: true });
            }
            return;
        }

        send.data[step.key] = value;
        send.step += 1;
        const next = SEND_STEPS[send.step];
        if (next.key === 'confirm') {
            print('--- 전송 내용 확인 ---', 'line-title');
            printLines([
                `  name    : ${escapeHTML(send.data.name)}`,
                `  email   : ${escapeHTML(send.data.email)}`,
                `  subject : ${escapeHTML(send.data.title)}`,
                `  message : ${escapeHTML(send.data.message)}`
            ]);
            print('이대로 전송할까요? (y/n)', 'line-dim');
        } else {
            print(next.ask, 'line-dim');
        }
        setPrompt(next.prompt, true);
    }

    async function runCommand(raw) {
        const value = raw.trim();
        if (send) return handleSendInput(raw);

        printCmd(raw);
        if (!value) return;

        history.push(value);
        historyIndex = history.length;

        const [name, ...args] = value.split(/\s+/);
        const key = aliases[name.toLowerCase()] || name.toLowerCase();
        const cmd = commands[key];
        if (cmd) {
            await cmd(args);
        } else {
            print(`command not found: ${escapeHTML(name)} — <span class="t-dim">help 를 입력해 명령어를 확인하세요.</span>`, 'line-err');
        }
    }

    termForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (busy) return;
        const raw = termInput.value;
        termInput.value = '';
        await runCommand(raw);
    });

    termInput.addEventListener('keydown', (e) => {
        if (send) return;
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex > 0) termInput.value = history[--historyIndex];
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex < history.length - 1) termInput.value = history[++historyIndex];
            else { historyIndex = history.length; termInput.value = ''; }
        } else if (e.key === 'Tab') {
            const partial = termInput.value.trim().toLowerCase();
            if (!partial) return;
            const match = Object.keys(commands).find((c) => c.startsWith(partial));
            if (match) { e.preventDefault(); termInput.value = match; }
        } else if (e.key === 'l' && e.ctrlKey) {
            e.preventDefault();
            commands.clear();
        }
    });

    screen.addEventListener('click', (e) => {
        if (e.target.closest('a')) return;
        termInput.focus({ preventScroll: true });
    });

    document.getElementById('terminalChips').addEventListener('click', (e) => {
        const chip = e.target.closest('[data-cmd]');
        if (!chip || busy) return;
        if (send && chip.dataset.cmd !== 'send') {
            print('대화형 입력 중입니다. 먼저 cancel 로 취소해 주세요.', 'line-warn');
        } else if (!send) {
            runCommand(chip.dataset.cmd);
        }
        termInput.focus({ preventScroll: true });
    });

    // Boot message
    print('Welcome to ori@portfolio — contact shell v2.0', 'line-title');
    print(`${PROFILE.name}에게 면접 제안을 보내려면 <span class="t-str">send</span>, 명령어 목록은 <span class="t-str">help</span> 를 입력하세요.`);
    print('', 'line-dim');

    // ============================================
    // Classic form handling
    // ============================================
    const formSuccess = document.getElementById('formSuccess');
    const submitBtn = document.getElementById('submitBtn');
    const sendAnother = document.getElementById('sendAnother');
    const formError = document.getElementById('formError');

    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        if (submitBtn.disabled || !contactForm.reportValidity()) return;

        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline-flex';
        submitBtn.disabled = true;
        contactForm.setAttribute('aria-busy', 'true');
        formError.hidden = true;

        try {
            const data = Object.fromEntries(new FormData(contactForm));
            await submitMessage({ ...data, channel: 'form' });
            contactForm.style.display = 'none';
            formSuccess.style.display = 'block';
            formSuccess.focus({ preventScroll: true });
        } catch (error) {
            formError.hidden = false;
        } finally {
            btnText.style.display = 'inline-flex';
            btnLoading.style.display = 'none';
            submitBtn.disabled = false;
            contactForm.removeAttribute('aria-busy');
        }
    });

    sendAnother.addEventListener('click', () => {
        contactForm.reset();
        contactForm.style.display = 'block';
        formSuccess.style.display = 'none';
        formError.hidden = true;
        contactForm.elements.name.focus({ preventScroll: true });
    });

    topButton.addEventListener('click', () => {
        document.querySelector('.nav-logo').focus({ preventScroll: true });
        window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
    });

    handleScroll();
});
