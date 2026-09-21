(function() {
  const hamburger = document.getElementById('hamburger');
  const navOverlay = document.getElementById('navOverlay');
  const navLinks = document.querySelectorAll('.nav-link');
  const langSwitch = document.getElementById('langSwitch');

  function toggleMenu() {
    hamburger.classList.toggle('active');
    navOverlay.classList.toggle('open');
    document.body.style.overflow = navOverlay.classList.contains('open') ? 'hidden' : '';
  }

  function closeMenu() {
    hamburger.classList.remove('active');
    navOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', toggleMenu);
  hamburger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleMenu();
    }
  });

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          closeMenu();
          setTimeout(() => {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 150);
        }
      } else {
        closeMenu();
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navOverlay.classList.contains('open')) {
      closeMenu();
    }
  });

  navOverlay.addEventListener('click', (e) => {
    if (e.target === navOverlay) {
      closeMenu();
    }
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target && !this.classList.contains('nav-link')) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  const translations = {
    en: {
      "nav.home": "Home",
      "nav.about": "About",
      "nav.projects": "Projects",
      "nav.exploits": "Exploits",
      "nav.privacy": "Privacy & Freedom",
      "nav.contact": "Contact",
      "hero.badge": "Planet 9 · Backrooms",
      "hero.highlight": "just sec stuff, developer :p",
      "hero.sub": "16 y.o Dev/Pentester & open-source advocate. Interested in Privacy, OpSec, Low Level. Also enjoy building PoC & Exploit. I love Sea Lions.",
      "about.label": "Who am I",
      "about.title": "About",
      "about.p1": "So yeah, I'm a 16-year-old pentester and software developer. Since I was little I've been into computers; especially hardware and software bridges, social media algorithms, architectures, vulnerabilities and even tragic stuff like how people get tracked through their phones, hardware backdoors and all that. Later on I got into operating systems, extensions, hardware... I realized every system can have a vulnerability and honestly those vulns coming out makes me happy, because even if we want it, having at least some control still in our hands feels nice, so through that I started developing exploits and writing PoCs. I use AI for stuff like coloring the skeletons and algorithms I write, turning them into clean code structure, so it becomes super easy to get a clean code structure and documentation (like README.md), and because of that I'm also keeping up with AI and I'm interested in AI vulnerabilities, uncensored AI, LLMs and Prompt Injection and stuff. I think open source is people's right and I'm trying to do some stuff for it in real and virtual environments. Also btw I think the best coffee is caramel macchiato :l. I'm half human half alien, why not. Turkey is my home. Most nights I'm writing astral travel programs and deleting the code of companies that write closed-source code. Also I look a bit like a sea lion, only difference from them is I write code :v, one day everyone will use open source and love sea lions.",
      "about.p2": "I live on the ninth planet (the Wi-Fi's brilliant, the pizza delivery's rubbish) and sometimes I dive into Backrooms during debugging sessions. Outside the cyber temple, I harbour a deep love for sea lions.",
      "about.researchLabel": "Research & Exploitation:",
      "about.researchText": "Writing PoC exploits for real-world daily vulnerabilities, UEFI & TPM, Buffer Overflow, Reverse Engineering, Privilege Escalation, web pentest scripting, kernel and system-level vulnerability investigation.",
      "about.osLabel": "Operating Systems:",
      "about.osText": "Linux customization & configuration, OS debloating, BSD family & Linux hardening. UEFI persistent virus writing attempts and code reviews.",
      "about.privacyLabel": "Privacy & Security:",
      "about.privacyText": "Kernel & hardware-level OpSec (Intel ME, TPM, coreboot & libreboot customization), telemetry removal, Open-source hardware (RISC-V, POWER9, lowRISC), custom ROM, i2p, Lokinet, GNU Net, Nym, Tor configuration.",
      "about.programmingLabel": "Programming:",
      "about.programmingText": "Python, Go, C Family, Java, Assembly for Kernel, Bash/PowerShell Automation.",
      "projects.label": "Selected work",
      "projects.title": "Projects",
      "projects.ironshell": "Bare-metal x86 shellcode execution & analysis environment in pure 16-bit Assembly. 2-stage bootloader, TUI shell, 8 injectable payloads, sandbox layer, opcode scanner.",
      "projects.godas": "High-performance columnar data analysis library for Go — typed Series, expressive filter expressions, concurrent GroupBy aggregation, hash joins, CSV/JSON/Parquet I/O.",
      "projects.huntcat": "Enterprise-grade web crawler & SEO auditor built in Go. Blazing-fast concurrent crawling with 50+ workers, smart SEO analysis, beautiful HTML/CSV reports.",
      "projects.discordcleaner": "Bulk deletion tool for Discord. Delete all messages from any user in any channel with smart rate-limit handling, batch processing, and real-time stats.",
      "projects.catify": "EXIF metadata tool. Extract camera settings, GPS coordinates (Google Maps/OSM links), detect duplicates via SHA256, save thumbnails. Terminal tables or export.",
      "projects.simplepot": "Educational basic honeypot, ~2500-line honeypot for learning attack patterns. 12+ protocols (SSH, HTTP, DNS, Modbus…). Captures credentials, maps MITRE ATT&CK, sends alerts.",
      "exploits.label": "PoC & toolkits",
      "exploits.title": "Exploits",
      "exploits.viewRepo": "view repo →",
      "exploits.otherTitle": "Other exploits",
      "exploits.otherDesc": "View all repositories on GitHub",
      "exploits.allRepos": "all repos →",
      "exploits.profile": "profile →",
      "exploits.cve85706": "GitLab Unauth File Read Toolkit (CVSS 10.0). This exploit targets self-managed GitLab CE/EE 18.7 through 19.3.1, allowing an unauthenticated attacker to read arbitrary files from the server through a path traversal in the project import endpoint. The toolkit is split into two tools: a full exploit that dumps files, forges admin tokens and runs a mass scanner, plus a safe checker for blue team validation. Repo lives at tc4dy/CVE-2026-85706-PoC-Toolkit under MIT.",
      "exploits.cve82329": "JFrog Artifactory Auth Bypass Toolkit (CVSS 9.8). Affects self-hosted Artifactory 7.x builds 111 to 161, where a JWT handling flaw lets an attacker forge admin sessions without valid credentials. The toolkit includes a full exploit with JWT forging, admin token creation, user creation and mass exploitation, plus a safe checker. Published as tc4dy/CVE-2026-82329-PoC-Exploit under MIT.",
      "exploits.cve54121": "CertiGhost AD CS Multi-Exploit Framework. Targets misconfigured Active Directory Certificate Services, combining rogue DC and LDAP servers with certificate abuse to extract PKINIT hashes from domain-joined machines. Includes a safe detect mode and a full exploitation mode with PKINIT hash extraction. Repo is tc4dy/CVE-2026-54121-PoC-Exploit under MIT.",
      "exploits.cve24061": "GNU inetutils-telnetd Auth Bypass Exploit. A CRLF injection in the NEW_ENVIRON telnet option lets a remote attacker bypass authentication and drop straight into a root shell on affected telnetd builds. Supports single-target and mass exploitation with multi-threading, written in Shell. Repo is tc4dy/CVE-2026-24061-PoC-Exploit under GPLv3.",
      "exploits.cve0073": "Android ADB Wireless Debugging Exploit (CVSS 8.8). A zero-click authentication bypass via TLS type confusion in the wireless debugging stack lets an attacker gain an interactive shell on the device. The tool can also execute commands and scan local networks for vulnerable targets. Repo is tc4dy/CVE-2026-0073-PoC-Exploit under MIT.",
      "exploits.cve41091": "RedSun — Microsoft Defender LPE exploit. A low-privileged user can escalate to NT AUTHORITY\\SYSTEM by abusing the Cloud Files API combined with NTFS junction trickery, forcing Defender to write malicious payloads into a controlled path. Written in C++. Repo is tc4dy/CVE-2026-41091-PoC-Exploit under MIT.",
      "exploits.cve65643": "cPanel Domain Parking RCE Toolkit (CVSS 8.7). Affects unpatched cPanel & WHM 11.x builds 110, 134, 136 and 138, where the domain parking feature can be abused to achieve remote code execution. The toolkit includes a full exploit with reverse shell, webshell and persistence options, plus a safe checker for defenders. Repo is tc4dy/CVE-2026-65643-PoC-Toolkit under MIT.",
      "exploits.cve15409": "SonicWall SMA1000 multi-exploit Framework. Chains SSRF to Erlang RPC, then to remote code execution and finally root privilege escalation on vulnerable SMA1000 appliances. Features include a safe detect mode, command execution, file read, privesc, RPC interaction, an interactive shell and batch threading. Repo is tc4dy/CVE-2026-15409-15410-Framework under MIT.",
      "exploits.cve58048": "cPanel Root SQL Execution Toolkit (CVSS 9.4). An SQL injection in unpatched cPanel & WHM 11.x lets an attacker execute arbitrary SQL as root, leading to full server compromise. The toolkit ships with a safe checker for auditing and a weaponized version that can spawn a reverse shell. Repo is tc4dy/CVE-2026-58048-PoC-Exploit under MIT.",
      "exploits.cve61511": "vBulletin Pre-Auth RCE (CVSS 9.8). Unpatched vBulletin 5.x and 6.x are vulnerable to a pre-authentication remote code execution via multiple exploit vectors, including endpoint pool abuse, AJAX and PHPFuck WAF bypass. The toolkit supports reverse shell, proxy, persistence, webshell and data exfiltration. Repo is tc4dy/CVE-2026-61511-PoC-Exploit under MIT.",
      "exploits.cve53921": "odhcpd Stack Overflow (CVSS 9.8). A stack overflow in odhcpd, the DHCPv6 server used by OpenWrt, can be triggered by crafted IA_NA or IA_PD options leading to remote code execution. The repo includes a detailed write-up, a verifier and multi-exploit support with MIPS and ARM shellcode. Repo is tc4dy/CVE-2026-53921-PoC-Exploit under MIT.",
      "exploits.cve29000": "pac4j-jwt Authentication Bypass (CVSS 10.0). A public-key JWE wrapping flaw in pac4j-jwt lets an attacker forge an admin token in one click, bypassing authentication entirely. Once in, the exploit can leak configs, users and secrets, with keep-alive, proxy and custom JWKS support. Repo is tc4dy/CVE-2026-29000-PoC-Exploit under MIT.",
      "exploits.cve41940": "cPanel/WHM Auth Bypass Exploit. A CRLF injection in the login flow leads to authentication bypass, session hijacking and account leakage on affected cPanel and WHM installs. The script supports proxies, custom user agents, keep-alive, retries and SSL verification toggles, with colored output. Repo is tc4dy/CVE-2026-41940-PoC-Exploit under MIT.",
      "exploits.cve64638": "WordPress Security Assessment Suite (CVSS 8.9). Targets WordPress 4.7.0 through 7.0.2 with a vulnerability assessment module and an advanced analysis module for deeper inspection. Includes both a safe check mode and an exploit mode for authorized testing. Repo is tc4dy/CVE-2026-64638-PoC-Exploit under MIT.",
      "privacy.label": "Open source & anti-censorship",
      "privacy.title": "Privacy & Freedom",
      "privacy.tagRepo": "repo",
      "privacy.tagSite": "site",
      "privacy.torDesc": "This is a beginner-friendly guide designed to help anyone fight censorship by running Tor relays, bridges, and Snowflake proxies. Snowflake is a pluggable transport that routes Tor traffic through volunteer-operated WebRTC proxies, making it look like a video call instead of Tor traffic, which makes it much harder for censors to block. The guide includes ready-to-use configuration files, a list of free VPS providers where you can host a bridge or relay, and step-by-step instructions so you don't need deep technical knowledge to contribute. The goal is simple: make the Tor network stronger and more resilient by adding more volunteer-run entry points.",
      "privacy.leaveDesc": "LeaveMyInternet is an open source awareness project focused on fighting for a free, private, and untracked internet. The project highlights how modern web tracking, telemetry, and data collection work in practice, and what regular people can do to reduce their digital footprint. It's not just a manifesto; it's a practical resource that points to concrete tools, browser configurations, and privacy-respecting alternatives. The goal is to make privacy accessible instead of something only experts can achieve.",
      "privacy.beautifulDesc": "BeautifulSource is a comprehensive guide to open source alternatives for everyday closed-source software. It covers categories like operating systems, browsers, office suites, media players, development tools, and more, listing what you can replace and why it matters. The project is built on the idea that people shouldn't have to sacrifice usability or quality just to use software they can audit and control. Each entry explains what the tool does, what it replaces, and where to get it, making the switch from closed-source software as easy as possible.",
      "contact.label": "Get in touch",
      "contact.title": "Contact",
      "contact.sessionLabel": "Session Message ID (https://getsession.org/)",
      "contact.note": "Open for collaborations, security research, and low-level discussions.",
      "footer": "Tc4dy · c4d/al1en · Planet 9, Backrooms",
      "stats.followers": "followers",
      "stats.following": "following",
      "stats.repos": "public repos",
      "stats.loading.followers": "loading followers…",
      "stats.loading.following": "loading following…",
      "stats.loading.repos": "loading repos…"
    },
    tr: {
      "nav.home": "Ana Sayfa",
      "nav.about": "Hakkımda",
      "nav.projects": "Projeler",
      "nav.exploits": "Exploitler",
      "nav.privacy": "Gizlilik & Özgürlük",
      "nav.contact": "İletişim",
      "hero.badge": "Gezegen 9 · Backrooms",
      "hero.highlight": "sadece güvenlik işleri, geliştirici :p",
      "hero.sub": "16 yaşında geliştirici/pentester & açık kaynak savunucusu. Gizlilik, OpSec ve Low Level konularına ilgiliyim. Ayrıca PoC & Exploit yazmayı seviyorum. Denizaslanlarını seviyorum.",
      "about.label": "Ben kimim",
      "about.title": "Hakkımda",
      "about.p1": "Yani, 16 yaşında bir pentester ve yazılım geliştiricisiyim. Küçüklüğümden beri bilgisayarlarla ilgileniyorum; özellikle donanım ve yazılım köprüleri, sosyal medya algoritmaları, mimariler, açıklar hatta insanların telefonları üzerinden nasıl takip edildiği, donanım backdoorları gibi trajik konularla ilede ilgileniyordum. Sonrası zamanlarda işletim sistemleri, eklentiler, donanımlar... her sistemin bir açığı olabileceğini fark ettim ve açıkçası bu açıkların ortaya çıkması beni mutlu ediyor, çünkü istesek de en azından bir miktar kontrolün hala elimizde olması güzel bir his, bu yüzden exploit geliştirmeye ve PoC yazmaya başladım. Yazdığım iskeletler ve algoritmaları renklendirme temiz kod yapısına büründürme gibi işlemler için yapay zekayı kullanıyorum, böylece temiz bir kod yapısına ve dokümantasyona (README.md gibi işler) için aşırı bir kolaylık oluyor bu nedenlede aynı zamanda yapay zekaya ayak uyduruyorum ve AI açıkları, sansürsüz AI, LLM'ler ve Prompt Injection gibi konulara da ilgi duyuyorum. Açık kaynağın insanların hakkı olduğunu düşünüyorum ve gerçek ve sanal ortamlarda bunun için bir şeyler yapmaya çalışıyorum. Bu arada bence en iyi kahve caramel macchiato :l. Yarı insan yarı uzaylıyım, neden olmasın. Türkiye benim evim. Çoğu gece astral seyahat programları yazıyorum ve kapalı kaynak kod yazan şirketlerin kodlarını siliyorum. Ayrıca biraz denizaslanına benziyorum, tek farkım kod yazmam :v, bir gün herkes açık kaynak kullanacak ve denizaslanlarını sevecek.",
      "about.p2": "Dokuzuncu gezegende yaşıyorum (Wi-Fi harika, pizza teslimatı berbat) ve bazen hata ayıklama seanslarında Backrooms'a dalıyorum. Siber tapınağın dışında denizaslanlarına derin bir sevgi besliyorum.",
      "about.researchLabel": "Araştırma & Exploitation:",
      "about.researchText": "Gerçek dünyadaki günlük açıklar için PoC exploitler yazmak, UEFI & TPM, Buffer Overflow, Tersine Mühendislik, Yetki Yükseltme, web pentest betikleri, çekirdek ve sistem seviyesi açık araştırması.",
      "about.osLabel": "İşletim Sistemleri:",
      "about.osText": "Linux özelleştirme & yapılandırma, işletim sistemi şişkinlik giderme, BSD ailesi & Linux sertleştirme. UEFI kalıcı virüs yazma denemeleri ve kod incelemeleri.",
      "about.privacyLabel": "Gizlilik & Güvenlik:",
      "about.privacyText": "Çekirdek & donanım seviyesi OpSec (Intel ME, TPM, coreboot & libreboot özelleştirme), telemetri kaldırma, Açık kaynak donanım (RISC-V, POWER9, lowRISC), özel ROM, i2p, Lokinet, GNU Net, Nym, Tor yapılandırması.",
      "about.programmingLabel": "Programlama:",
      "about.programmingText": "Python, Go, C Ailesi, Java, Kernel için Assembly, Bash/PowerShell Otomasyonu.",
      "projects.label": "Seçilmiş işler",
      "projects.title": "Projeler",
      "projects.ironshell": "Saf 16-bit Assembly ile bare-metal x86 shellcode çalıştırma & analiz ortamı. 2 aşamalı bootloader, TUI kabuk, 8 enjekte edilebilir payload, sandbox katmanı, opcode tarayıcı.",
      "projects.godas": "Go için yüksek performanslı kolon bazlı veri analiz kütüphanesi — tipli Series, ifade edici filtre ifadeleri, eşzamanlı GroupBy toplama, hash join, CSV/JSON/Parquet I/O.",
      "projects.huntcat": "Go ile yazılmış kurumsal düzeyde web tarayıcı & SEO denetleyicisi. 50+ worker ile ışık hızında eşzamanlı tarama, akıllı SEO analizi, güzel HTML/CSV raporları.",
      "projects.discordcleaner": "Discord için toplu silme aracı. Herhangi bir kanalda herhangi bir kullanıcının tüm mesajlarını akıllı rate-limit yönetimi, toplu işleme ve gerçek zamanlı istatistiklerle silin.",
      "projects.catify": "EXIF metadata aracı. Kamera ayarlarını, GPS koordinatlarını (Google Maps/OSM linkleri) çıkarın, SHA256 ile kopyaları tespit edin, thumbnail kaydedin. Terminal tabloları veya dışa aktarma.",
      "projects.simplepot": "Eğitim amaçlı basit honeypot, saldırı kalıplarını öğrenmek için ~2500 satırlık honeypot. 12+ protokol (SSH, HTTP, DNS, Modbus…). Kimlik bilgilerini yakalar, MITRE ATT&CK ile eşler, uyarı gönderir.",
      "exploits.label": "PoC & araç setleri",
      "exploits.title": "Exploitler",
      "exploits.viewRepo": "repoyu gör →",
      "exploits.otherTitle": "Diğer exploitler",
      "exploits.otherDesc": "GitHub'daki tüm repoları görüntüle",
      "exploits.allRepos": "tüm repolar →",
      "exploits.profile": "profil →",
      "exploits.cve85706": "GitLab Kimlik Doğrulamasız Dosya Okuma Araç Seti (CVSS 10.0). Bu exploit, self-hosted GitLab CE/EE 18.7 ile 19.3.1 sürümlerini hedef alır ve kimlik doğrulaması olmayan bir saldırganın proje içe aktarma uç noktasındaki path traversal ile sunucudan rastgele dosyalar okumasına olanak tanır. Araç seti iki araçtan oluşur: dosyaları dökümleyen, admin token oluşturan ve toplu tarama yapan tam exploit, artı blue team doğrulaması için güvenli kontrol aracı. Repo, MIT lisansı altında tc4dy/CVE-2026-85706-PoC-Toolkit adresinde.",
      "exploits.cve82329": "JFrog Artifactory Kimlik Doğrulama Atlatma Araç Seti (CVSS 9.8). Self-hosted Artifactory 7.x build 111 ile 161 arasını etkiler; burada JWT işleme hatası, saldırganın geçerli kimlik bilgileri olmadan admin oturumları oluşturmasına izin verir. Araç seti JWT sahteleme, admin token oluşturma, kullanıcı oluşturma ve toplu exploitation içeren tam exploit ile güvenli kontrol aracını içerir. MIT lisansı altında tc4dy/CVE-2026-82329-PoC-Exploit olarak yayınlandı.",
      "exploits.cve54121": "CertiGhost AD CS Çoklu Exploit Framework. Yanlış yapılandırılmış Active Directory Certificate Services'i hedef alır; rogue DC ve LDAP sunucularını sertifika istismarıyla birleştirerek domain'e katılmış makinelerden PKINIT hash'lerini çıkarır. Güvenli tespit modu ve PKINIT hash çıkarma ile tam exploitation modu içerir. Repo, MIT lisansı altında tc4dy/CVE-2026-54121-PoC-Exploit.",
      "exploits.cve24061": "GNU inetutils-telnetd Kimlik Doğrulama Atlatma Exploiti. NEW_ENVIRON telnet seçeneğindeki CRLF enjeksiyonu, uzaktaki bir saldırganın kimlik doğrulamayı atlayıp etkilenen telnetd build'lerinde doğrudan root kabuğuna düşmesine izin verir. Çok iş parçacıklı tek hedef ve toplu exploitation destekler, Shell ile yazılmıştır. Repo, GPLv3 altında tc4dy/CVE-2026-24061-PoC-Exploit.",
      "exploits.cve0073": "Android ADB Kablosuz Hata Ayıklama Exploiti (CVSS 8.8). Kablosuz hata ayıklama yığınındaki TLS tip karışıklığı üzerinden sıfır tıklamalı kimlik doğrulama atlatma, saldırganın cihazda etkileşimli kabuk elde etmesini sağlar. Araç ayrıca komut çalıştırabilir ve savunmasız hedefler için yerel ağları tarayabilir. Repo, MIT lisansı altında tc4dy/CVE-2026-0073-PoC-Exploit.",
      "exploits.cve41091": "RedSun — Microsoft Defender LPE exploiti. Düşük yetkili bir kullanıcı, Cloud Files API'yi NTFS junction hilesiyle birleştirerek NT AUTHORITY\\SYSTEM'e yükselebilir ve Defender'ı kontrol edilen bir yola kötü amaçlı payload yazmaya zorlar. C++ ile yazılmıştır. Repo, MIT lisansı altında tc4dy/CVE-2026-41091-PoC-Exploit.",
      "exploits.cve65643": "cPanel Domain Parking RCE Araç Seti (CVSS 8.7). Yamasız cPanel & WHM 11.x build 110, 134, 136 ve 138'i etkiler; domain parking özelliği uzaktan kod çalıştırma için istismar edilebilir. Araç seti reverse shell, webshell ve kalıcılık seçenekleriyle tam exploit ve savunmacılar için güvenli kontrol aracı içerir. Repo, MIT lisansı altında tc4dy/CVE-2026-65643-PoC-Toolkit.",
      "exploits.cve15409": "SonicWall SMA1000 çoklu exploit Framework. Savunmasız SMA1000 cihazlarında SSRF'yi Erlang RPC'ye, ardından uzaktan kod çalıştırmaya ve son olarak root yetki yükseltmeye zincirler. Özellikler arasında güvenli tespit modu, komut çalıştırma, dosya okuma, privesc, RPC etkileşimi, etkileşimli kabuk ve toplu iş parçacığı bulunur. Repo, MIT lisansı altında tc4dy/CVE-2026-15409-15410-Framework.",
      "exploits.cve58048": "cPanel Root SQL Çalıştırma Araç Seti (CVSS 9.4). Yamasız cPanel & WHM 11.x'teki bir SQL enjeksiyonu, saldırganın root olarak rastgele SQL çalıştırmasına olanak tanır ve tam sunucu ele geçirmeye yol açar. Araç seti denetim için güvenli kontrol aracı ve reverse shell başlatabilen silahlandırılmış bir sürüm içerir. Repo, MIT lisansı altında tc4dy/CVE-2026-58048-PoC-Exploit.",
      "exploits.cve61511": "vBulletin Kimlik Öncesi RCE (CVSS 9.8). Yamasız vBulletin 5.x ve 6.x, endpoint pool istismarı, AJAX ve PHPFuck WAF bypass dahil birden fazla exploit vektörü üzerinden kimlik doğrulama öncesi uzaktan kod çalıştırmaya karşı savunmasızdır. Araç seti reverse shell, proxy, kalıcılık, webshell ve veri sızdırmayı destekler. Repo, MIT lisansı altında tc4dy/CVE-2026-61511-PoC-Exploit.",
      "exploits.cve53921": "odhcpd Stack Overflow (CVSS 9.8). OpenWrt tarafından kullanılan DHCPv6 sunucusu odhcpd'deki bir stack overflow, hazırlanmış IA_NA veya IA_PD seçenekleriyle tetiklenebilir ve uzaktan kod çalıştırmaya yol açar. Repo detaylı bir yazı, doğrulayıcı ve MIPS ve ARM shellcode ile çoklu exploit desteği içerir. Repo, MIT lisansı altında tc4dy/CVE-2026-53921-PoC-Exploit.",
      "exploits.cve29000": "pac4j-jwt Kimlik Doğrulama Atlatma (CVSS 10.0). pac4j-jwt'deki public-key JWE wrapping hatası, saldırganın tek tıklamayla admin token oluşturmasına ve kimlik doğrulamayı tamamen atlamasına izin verir. İçeri girdikten sonra exploit, keep-alive, proxy ve özel JWKS desteğiyle yapılandırmaları, kullanıcıları ve sırları sızdırabilir. Repo, MIT lisansı altında tc4dy/CVE-2026-29000-PoC-Exploit.",
      "exploits.cve41940": "cPanel/WHM Kimlik Doğrulama Atlatma Exploiti. Giriş akışındaki bir CRLF enjeksiyonu, etkilenen cPanel ve WHM kurulumlarında kimlik doğrulama atlatma, oturum ele geçirme ve hesap sızıntısına yol açar. Betik proxy, özel user agent, keep-alive, yeniden deneme ve SSL doğrulama anahtarlarını renkli çıktıyla destekler. Repo, MIT lisansı altında tc4dy/CVE-2026-41940-PoC-Exploit.",
      "exploits.cve64638": "WordPress Güvenlik Değerlendirme Paketi (CVSS 8.9). WordPress 4.7.0 ile 7.0.2 sürümlerini hedefler; bir açık değerlendirme modülü ve daha derin inceleme için gelişmiş analiz modülü içerir. Yetkili testler için hem güvenli kontrol modu hem de exploit modu içerir. Repo, MIT lisansı altında tc4dy/CVE-2026-64638-PoC-Exploit.",
      "privacy.label": "Açık kaynak & sansür karşıtı",
      "privacy.title": "Gizlilik & Özgürlük",
      "privacy.tagRepo": "repo",
      "privacy.tagSite": "site",
      "privacy.torDesc": "Bu, herkesin Tor relay, bridge ve Snowflake proxy'leri çalıştırarak sansürle savaşmasına yardımcı olmak için tasarlanmış yeni başlayan dostu bir rehberdir. Snowflake, Tor trafiğini gönüllü işletilen WebRTC proxy'leri üzerinden yönlendiren bir pluggable transport'tur ve Tor trafiği yerine görüntülü arama gibi görünmesini sağlar, bu da sansürcülerin engellemesini çok daha zorlaştırır. Rehber, kullanıma hazır yapılandırma dosyaları, bridge veya relay barındırabileceğiniz ücretsiz VPS sağlayıcılarının listesi ve adım adım talimatlar içerir, böylece katkıda bulunmak için derin teknik bilgiye ihtiyacınız olmaz. Amaç basit: daha fazla gönüllü tarafından işletilen giriş noktası ekleyerek Tor ağını daha güçlü ve dayanıklı hale getirmek.",
      "privacy.leaveDesc": "LeaveMyInternet, özgür, gizli ve izlenmeyen bir internet için savaşmaya odaklanmış açık kaynak bir farkındalık projesidir. Proje, modern web takibinin, telemetrinin ve veri toplamanın pratikte nasıl çalıştığını ve sıradan insanların dijital ayak izlerini azaltmak için neler yapabileceğini vurgular. Bu sadece bir manifesto değil; somut araçlara, tarayıcı yapılandırmalarına ve gizliliğe saygılı alternatiflere işaret eden pratik bir kaynaktır. Amaç, gizliliği yalnızca uzmanların başarabileceği bir şey olmaktan çıkarıp herkes için erişilebilir kılmaktır.",
      "privacy.beautifulDesc": "BeautifulSource, günlük kapalı kaynak yazılımlar için açık kaynak alternatiflerine kapsamlı bir rehberdir. İşletim sistemleri, tarayıcılar, ofis paketleri, medya oynatıcılar, geliştirme araçları ve daha fazlası gibi kategorileri kapsar; neleri değiştirebileceğinizi ve bunun neden önemli olduğunu listeler. Proje, insanların denetleyebilecekleri ve kontrol edebilecekleri yazılımları kullanmak için kullanılabilirlikten veya kaliteden fedakarlık etmek zorunda olmamaları fikri üzerine inşa edilmiştir. Her giriş, aracın ne yaptığını, neyin yerini aldığını ve nereden edinileceğini açıklar; kapalı kaynak yazılımdan geçişi olabildiğince kolaylaştırır.",
      "contact.label": "İletişime geç",
      "contact.title": "İletişim",
      "contact.sessionLabel": "Session Mesaj ID (https://getsession.org/)",
      "contact.note": "İş birlikleri, güvenlik araştırmaları ve low-level tartışmalar için açığım.",
      "footer": "Tc4dy · c4d/al1en · Gezegen 9, Backrooms",
      "stats.followers": "takipçi",
      "stats.following": "takip edilen",
      "stats.repos": "herkese açık repo",
      "stats.loading.followers": "takipçiler yükleniyor…",
      "stats.loading.following": "takip edilenler yükleniyor…",
      "stats.loading.repos": "repolar yükleniyor…"
    }
  };

  let currentLang = localStorage.getItem('tc4dy-lang') || 'en';
  let githubData = null;

  function applyLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;

    if (lang === 'tr') {
      langSwitch.classList.add('tr');
    } else {
      langSwitch.classList.remove('tr');
    }

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key] !== undefined) {
        el.textContent = translations[lang][key];
      }
    });

    updateStats();

    localStorage.setItem('tc4dy-lang', lang);
  }

  function updateStats() {
    const followersEl = document.getElementById('followersDisplay');
    const followingEl = document.getElementById('followingDisplay');
    const reposEl = document.getElementById('reposDisplay');
    const t = translations[currentLang];

    if (githubData) {
      followersEl.textContent = `${githubData.followers} ${t['stats.followers']}`;
      followingEl.textContent = `${githubData.following} ${t['stats.following']}`;
      reposEl.textContent = `${githubData.public_repos}+ ${t['stats.repos']}`;
      followersEl.classList.remove('loading');
      followingEl.classList.remove('loading');
      reposEl.classList.remove('loading');
    } else {
      followersEl.textContent = t['stats.loading.followers'];
      followingEl.textContent = t['stats.loading.following'];
      reposEl.textContent = t['stats.loading.repos'];
    }
  }

  langSwitch.addEventListener('click', () => {
    applyLanguage(currentLang === 'en' ? 'tr' : 'en');
  });

  langSwitch.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      applyLanguage(currentLang === 'en' ? 'tr' : 'en');
    }
  });

  applyLanguage(currentLang);

  const GITHUB_USERNAME = 'tc4dy';

  async function fetchGitHubStats() {
    try {
      const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
      if (!res.ok) throw new Error('GitHub API error');
      githubData = await res.json();
      updateStats();
    } catch (err) {
      githubData = {
        followers: 56,
        following: 1,
        public_repos: 43
      };
      updateStats();
      console.warn('GitHub stats fetch failed, using fallback.', err);
    }
  }

  fetchGitHubStats();

})();
