import Database from "better-sqlite3";
import path from "path";

const DB_PATH = path.join(process.cwd(), "data.db");

let db: Database.Database | null = null;

function getDb(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma("journal_mode = WAL");
    initTables(db);
  }
  return db;
}

function initTables(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS contact_submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      services TEXT NOT NULL DEFAULT '[]',
      message TEXT DEFAULT '',
      status TEXT NOT NULL DEFAULT 'pending',
      created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now', '+7 hours'))
    );

    CREATE TABLE IF NOT EXISTS services (
      id TEXT PRIMARY KEY,
      category_id TEXT NOT NULL,
      category_title TEXT NOT NULL,
      category_subtitle TEXT DEFAULT '',
      category_icon TEXT DEFAULT '',
      category_layout TEXT DEFAULT '2col',
      title TEXT NOT NULL,
      description TEXT DEFAULT '',
      tags TEXT NOT NULL DEFAULT '[]',
      icon TEXT DEFAULT '',
      created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now', '+7 hours')),
      updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now', '+7 hours'))
    );

    CREATE TABLE IF NOT EXISTS testimonials (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      initials TEXT NOT NULL,
      name TEXT NOT NULL,
      company TEXT NOT NULL,
      quote TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now', '+7 hours'))
    );

    CREATE TABLE IF NOT EXISTS clients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      pic TEXT NOT NULL,
      phone TEXT NOT NULL,
      active_services INTEGER NOT NULL DEFAULT 0,
      status TEXT NOT NULL DEFAULT 'Aktif',
      created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now', '+7 hours'))
    );

    CREATE TABLE IF NOT EXISTS service_requests (
      id TEXT PRIMARY KEY,
      client TEXT NOT NULL,
      service TEXT NOT NULL,
      step TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'Baru',
      submitted_date TEXT NOT NULL,
      pic TEXT DEFAULT 'Belum ditugaskan',
      created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now', '+7 hours'))
    );

    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );
  `);
}

export interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  phone: string;
  services: string;
  message: string;
  status: "pending" | "read" | "responded";
  created_at: string;
}

export interface ServiceRow {
  id: string;
  category_id: string;
  category_title: string;
  category_subtitle: string;
  category_icon: string;
  category_layout: string;
  title: string;
  description: string;
  tags: string;
  icon: string;
}

export interface TestimonialRow {
  id: number;
  initials: string;
  name: string;
  company: string;
  quote: string;
  created_at: string;
}

export interface ClientRow {
  id: number;
  name: string;
  pic: string;
  phone: string;
  active_services: number;
  status: string;
  created_at: string;
}

export interface ServiceRequestRow {
  id: string;
  client: string;
  service: string;
  step: string;
  status: string;
  submitted_date: string;
  pic: string;
  created_at: string;
}

export function insertContact(data: {
  name: string;
  email: string;
  phone: string;
  services: string[];
  message: string;
}): ContactSubmission {
  const d = getDb();
  const stmt = d.prepare(
    `INSERT INTO contact_submissions (name, email, phone, services, message)
     VALUES (@name, @email, @phone, @services, @message)`,
  );
  const result = stmt.run({
    name: data.name,
    email: data.email,
    phone: data.phone,
    services: JSON.stringify(data.services),
    message: data.message,
  });
  return d
    .prepare("SELECT * FROM contact_submissions WHERE id = ?")
    .get(result.lastInsertRowid) as ContactSubmission;
}

export function getContacts(page = 1, limit = 20) {
  const d = getDb();
  const safePage = Math.max(1, page);
  const safeLimit = Math.min(100, Math.max(1, limit));
  const offset = (safePage - 1) * safeLimit;
  const total = (
    d.prepare("SELECT COUNT(*) as count FROM contact_submissions").get() as {
      count: number;
    }
  ).count;
  const items = d
    .prepare(
      "SELECT * FROM contact_submissions ORDER BY created_at DESC LIMIT ? OFFSET ?",
    )
    .all(limit, offset) as ContactSubmission[];
  return {
    items,
    total,
    page,
    limit,
    totalPages: Math.max(1, Math.ceil(total / limit)),
  };
}

export function updateContactStatus(
  id: number,
  status: "pending" | "read" | "responded",
) {
  const d = getDb();
  d.prepare("UPDATE contact_submissions SET status = ? WHERE id = ?").run(
    status,
    id,
  );
}

export function deleteContact(id: number) {
  const d = getDb();
  d.prepare("DELETE FROM contact_submissions WHERE id = ?").run(id);
}

export function getServices() {
  const d = getDb();
  const rows = d
    .prepare("SELECT * FROM services ORDER BY category_id, id")
    .all() as ServiceRow[];

  const categories = new Map<
    string,
    {
      id: string;
      title: string;
      subtitle: string;
      icon: string;
      layout: string;
      services: Array<{
        id: string;
        title: string;
        description: string;
        tags: string[];
        icon: string;
      }>;
    }
  >();

  for (const row of rows) {
    if (!categories.has(row.category_id)) {
      categories.set(row.category_id, {
        id: row.category_id,
        title: row.category_title,
        subtitle: row.category_subtitle,
        icon: row.category_icon,
        layout: row.category_layout,
        services: [],
      });
    }
    categories.get(row.category_id)!.services.push({
      id: row.id,
      title: row.title,
      description: row.description,
      tags: JSON.parse(row.tags),
      icon: row.icon,
    });
  }

  return Array.from(categories.values());
}

export function getTestimonials() {
  const d = getDb();
  return d
    .prepare("SELECT * FROM testimonials ORDER BY id")
    .all() as TestimonialRow[];
}

export function getClients(page = 1, limit = 20, search = "") {
  const d = getDb();
  const safePage = Math.max(1, page);
  const safeLimit = Math.min(100, Math.max(1, limit));
  const offset = (safePage - 1) * safeLimit;
  const searchPattern = `%${search}%`;

  const countQuery = search
    ? "SELECT COUNT(*) as count FROM clients WHERE name LIKE ? OR pic LIKE ?"
    : "SELECT COUNT(*) as count FROM clients";
  const countParams = search ? [searchPattern, searchPattern] : [];
  const total = (
    d.prepare(countQuery).get(...countParams) as { count: number }
  ).count;

  const dataQuery = search
    ? "SELECT * FROM clients WHERE name LIKE ? OR pic LIKE ? ORDER BY created_at DESC LIMIT ? OFFSET ?"
    : "SELECT * FROM clients ORDER BY created_at DESC LIMIT ? OFFSET ?";
  const dataParams = search
    ? [searchPattern, searchPattern, safeLimit, offset]
    : [safeLimit, offset];
  const items = d.prepare(dataQuery).all(...dataParams) as ClientRow[];

  return {
    items,
    total,
    page: safePage,
    limit: safeLimit,
    totalPages: Math.max(1, Math.ceil(total / safeLimit)),
  };
}

export function insertClient(data: {
  name: string;
  pic: string;
  phone: string;
  active_services?: number;
  status?: string;
}): ClientRow {
  const d = getDb();
  const result = d
    .prepare(
      `INSERT INTO clients (name, pic, phone, active_services, status)
       VALUES (@name, @pic, @phone, @active_services, @status)`,
    )
    .run({
      name: data.name,
      pic: data.pic,
      phone: data.phone,
      active_services: data.active_services ?? 0,
      status: data.status ?? "Aktif",
    });
  return d
    .prepare("SELECT * FROM clients WHERE id = ?")
    .get(result.lastInsertRowid) as ClientRow;
}

export function updateClient(
  id: number,
  data: Partial<Omit<ClientRow, "id" | "created_at">>,
) {
  const d = getDb();
  const fields: string[] = [];
  const values: unknown[] = [];
  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined) {
      fields.push(`${key} = ?`);
      values.push(value);
    }
  }
  if (fields.length === 0) return;
  values.push(id);
  d.prepare(`UPDATE clients SET ${fields.join(", ")} WHERE id = ?`).run(
    ...values,
  );
}

export function deleteClient(id: number) {
  const d = getDb();
  d.prepare("DELETE FROM clients WHERE id = ?").run(id);
}

export function getServiceRequests(page = 1, limit = 20, search = "") {
  const d = getDb();
  const safePage = Math.max(1, page);
  const safeLimit = Math.min(100, Math.max(1, limit));
  const offset = (safePage - 1) * safeLimit;
  const searchPattern = `%${search}%`;

  const countQuery = search
    ? "SELECT COUNT(*) as count FROM service_requests WHERE client LIKE ? OR service LIKE ?"
    : "SELECT COUNT(*) as count FROM service_requests";
  const countParams = search ? [searchPattern, searchPattern] : [];
  const total = (
    d.prepare(countQuery).get(...countParams) as { count: number }
  ).count;

  const dataQuery = search
    ? "SELECT * FROM service_requests WHERE client LIKE ? OR service LIKE ? ORDER BY created_at DESC LIMIT ? OFFSET ?"
    : "SELECT * FROM service_requests ORDER BY created_at DESC LIMIT ? OFFSET ?";
  const dataParams = search
    ? [searchPattern, searchPattern, safeLimit, offset]
    : [safeLimit, offset];
  const items = d.prepare(dataQuery).all(...dataParams) as ServiceRequestRow[];

  return {
    items,
    total,
    page: safePage,
    limit: safeLimit,
    totalPages: Math.max(1, Math.ceil(total / safeLimit)),
  };
}

export function getSettings() {
  const d = getDb();
  const rows = d.prepare("SELECT * FROM settings").all() as { key: string; value: string }[];
  return Object.fromEntries(rows.map((r) => [r.key, r.value]));
}

export function updateSettings(data: Record<string, string>) {
  const d = getDb();
  const stmt = d.prepare(
    "INSERT OR REPLACE INTO settings (key, value) VALUES (@key, @value)",
  );
  for (const [key, value] of Object.entries(data)) {
    stmt.run({ key, value });
  }
}

export function seedData() {
  const d = getDb();

  const serviceCount = (d.prepare("SELECT COUNT(*) as count FROM services").get() as { count: number }).count;
  if (serviceCount > 0) return;

  const serviceRows = [
    { id: "ppiu", category_id: "perizinan", category_title: "Perizinan", category_subtitle: "Legalitas dan izin resmi untuk travel ibadah", category_icon: "document", category_layout: "2col", title: "PPIU", description: "Izin Penyelenggara Perjalanan Ibadah Umrah — syarat utama operasional travel umrah di Indonesia.", tags: '["Kemenag","Umrah","Wajib"]', icon: "award" },
    { id: "pihk", category_id: "perizinan", category_title: "Perizinan", category_subtitle: "Legalitas dan izin resmi untuk travel ibadah", category_icon: "document", category_layout: "2col", title: "PIHK", description: "Izin Penyelenggara Ibadah Haji Khusus — wajib bagi travel yang menyelenggarakan haji khusus.", tags: '["Kemenag","Haji","Wajib"]', icon: "shield" },
    { id: "akreditasi", category_id: "perizinan", category_title: "Perizinan", category_subtitle: "Legalitas dan izin resmi untuk travel ibadah", category_icon: "document", category_layout: "2col", title: "Akreditasi & Surveilance", description: "Proses akreditasi travel dan pengawasan surveilance berkala sesuai regulasi Kemenag.", tags: '["Akreditasi","Surveilance"]', icon: "monitor" },
    { id: "iata", category_id: "perizinan", category_title: "Perizinan", category_subtitle: "Legalitas dan izin resmi untuk travel ibadah", category_icon: "document", category_layout: "2col", title: "Akreditasi IATA", description: "Sertifikasi IATA untuk akses langsung ke sistem tiket maskapai internasional.", tags: '["Penerbangan","Tiket","IATA"]', icon: "plane" },
    { id: "keuangan", category_id: "administratif", category_title: "Administratif", category_subtitle: "Dukungan administratif dan keuangan", category_icon: "chart", category_layout: "2col", title: "Laporan Keuangan", description: "Pelaporan keuangan sesuai standar akuntansi untuk travel ibadah.", tags: '["Laporan","Akuntansi"]', icon: "credit-card" },
    { id: "pajak", category_id: "administratif", category_title: "Administratif", category_subtitle: "Dukungan administratif dan keuangan", category_icon: "chart", category_layout: "2col", title: "Perpajakan", description: "Penanganan kewajiban perpajakan travel ibadah sesuai regulasi perpajakan terbaru.", tags: '["Pajak","Kepatuhan"]', icon: "chart" },
    { id: "bank-garansi", category_id: "administratif", category_title: "Administratif", category_subtitle: "Dukungan administratif dan keuangan", category_icon: "chart", category_layout: "2col", title: "Bank Garansi", description: "Pengurusan bank garansi sebagai persyaratan administratif perizinan travel.", tags: '["Garansi","Perbankan"]', icon: "bank" },
    { id: "surety-bond", category_id: "administratif", category_title: "Administratif", category_subtitle: "Dukungan administratif dan keuangan", category_icon: "chart", category_layout: "2col", title: "Surety Bond", description: "Jaminan surety bond untuk memenuhi kewajiban finansial travel ibadah Anda.", tags: '["Jaminan","Keuangan"]', icon: "shield" },
  ];

  const stmt = d.prepare(
    `INSERT INTO services (id, category_id, category_title, category_subtitle, category_icon, category_layout, title, description, tags, icon)
     VALUES (@id, @category_id, @category_title, @category_subtitle, @category_icon, @category_layout, @title, @description, @tags, @icon)`,
  );

  for (const row of serviceRows) {
    stmt.run(row);
  }

  const testimonialRows = [
    { initials: "AR", name: "Ahmad Rahman", company: "PT Al-Haramain Travel", quote: "Jamnasindo sangat profesional. Proses PPIU kami selesai lebih cepat dari perkiraan. Tim mereka selalu responsif dan informatif." },
    { initials: "SN", name: "Siti Nurhaliza", company: "CV Barokah Umrah", quote: "Saya sangat terbantu dengan layanan administrasi mereka. Laporan keuangan jadi rapi dan sesuai standar. Sangat direkomendasikan." },
    { initials: "HW", name: "Hadi Wijaya", company: "PT Madinah Indah Travel", quote: "Pengurusan IATA kami berjalan mulus berkat Jamnasindo. Tim mereka paham betul regulasi dan proses birokrasi." },
  ];

  const tstmt = d.prepare(
    `INSERT INTO testimonials (initials, name, company, quote)
     VALUES (@initials, @name, @company, @quote)`,
  );

  for (const row of testimonialRows) {
    tstmt.run(row);
  }

  const clientCount = (d.prepare("SELECT COUNT(*) as count FROM clients").get() as { count: number }).count;
  if (clientCount === 0) {
    const clientRows = [
      { name: "PT. Safa Marwa Travel", pic: "Ahmad Hidayat", phone: "081234567890", active_services: 2, status: "Aktif" },
      { name: "CV. Baitullah Wisata", pic: "Fatimah Rizki", phone: "089876543210", active_services: 1, status: "Aktif" },
      { name: "PT. Mabrur Perdana", pic: "Muhammad Syafii", phone: "081122334455", active_services: 3, status: "Pending" },
      { name: "Klub Haji Indonesia", pic: "Budi Santoso", phone: "085566778899", active_services: 0, status: "Nonaktif" },
    ];
    const cstmt = d.prepare(
      `INSERT INTO clients (name, pic, phone, active_services, status)
       VALUES (@name, @pic, @phone, @active_services, @status)`,
    );
    for (const row of clientRows) {
      cstmt.run(row);
    }
  }

  const srCount = (d.prepare("SELECT COUNT(*) as count FROM service_requests").get() as { count: number }).count;
  if (srCount === 0) {
    const srRows = [
      { id: "SRV-001", client: "PT. Safa Marwa Travel", service: "Perizinan PPIU", step: "Verifikasi Dokumen", status: "Diproses", submitted_date: "10 Mei 2024", pic: "Admin 1" },
      { id: "SRV-002", client: "CV. Baitullah Wisata", service: "Bank Garansi", step: "Penerbitan BG", status: "Selesai", submitted_date: "5 Mei 2024", pic: "Admin 2" },
      { id: "SRV-003", client: "PT. Mabrur Perdana", service: "Perizinan IATA", step: "Revisi Data", status: "Butuh Revisi", submitted_date: "12 Mei 2024", pic: "Admin 1" },
      { id: "SRV-004", client: "Klub Haji Indonesia", service: "Perizinan PIHK", step: "Pengajuan Awal", status: "Baru", submitted_date: "14 Mei 2024", pic: "Belum ditugaskan" },
      { id: "SRV-005", client: "PT. Amanah Umroh", service: "Laporan Keuangan", step: "Penyusunan Laporan", status: "Diproses", submitted_date: "13 Mei 2024", pic: "Admin 3" },
    ];
    const srstmt = d.prepare(
      `INSERT INTO service_requests (id, client, service, step, status, submitted_date, pic)
       VALUES (@id, @client, @service, @step, @status, @submitted_date, @pic)`,
    );
    for (const row of srRows) {
      srstmt.run(row);
    }
  }

  const settingsCount = (d.prepare("SELECT COUNT(*) as count FROM settings").get() as { count: number }).count;
  if (settingsCount === 0) {
    const sstmt = d.prepare("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)");
    sstmt.run("company_name", "PT. Jaminan Nasional Indonesia");
    sstmt.run("company_email", "admin@jamnas.id");
    sstmt.run("company_phone", "+62 21 1234 5678");
    sstmt.run("company_website", "https://jamnas.id");
    sstmt.run("company_address", "Jl. Sudirman No. 123, Jakarta Pusat 10220");
  }
}

seedData();
