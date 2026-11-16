import 'dotenv/config';
import pg from 'pg';

const statements = [
  `COMMENT ON TABLE public.user IS '用户账号'`,
  `COMMENT ON COLUMN public.user.id IS '主键，由数据库自增'`,
  `COMMENT ON COLUMN public.user.email IS '登录邮箱，全表唯一'`,
  `COMMENT ON COLUMN public.user.username IS '用户名，可空'`,
  `COMMENT ON COLUMN public.user.name IS '显示名称，可空'`,
  `COMMENT ON COLUMN public.user."createdAt" IS '创建时间，插入行时写入当前时间'`,
  `COMMENT ON COLUMN public.user."updatedAt" IS '最近一次更新时间'`,
  `COMMENT ON TABLE public.post IS '文章'`,
  `COMMENT ON COLUMN public.post.id IS '主键，由数据库自增'`,
  `COMMENT ON COLUMN public.post.title IS '文章标题'`,
  `COMMENT ON COLUMN public.post.content IS '文章正文，可空'`,
  `COMMENT ON COLUMN public.post."authorId" IS '作者的用户 id，外键引用 User.id'`,
  `COMMENT ON COLUMN public.post."createdAt" IS '创建时间，插入行时写入当前时间'`,
  `COMMENT ON COLUMN public.post."updatedAt" IS '最近一次更新时间'`,
];

const client = new pg.Client({ connectionString: process.env.DATABASE_URL });
await client.connect();
try {
  for (const sql of statements) await client.query(sql);
  const { rows } = await client.query(`
    SELECT c.relname AS "table",
           COALESCE(a.attname, '') AS "column",
           d.description
    FROM pg_description d
    JOIN pg_class c ON c.oid = d.objoid
    JOIN pg_namespace n ON n.oid = c.relnamespace
    LEFT JOIN pg_attribute a ON a.attrelid = c.oid AND a.attnum = d.objsubid
    WHERE n.nspname = 'public' AND c.relname IN ('user', 'post')
    ORDER BY c.relname, d.objsubid
  `);
  for (const row of rows) {
    const target = row.column ? `${row.table}.${row.column}` : row.table;
    console.log(`${target}: ${row.description}`);
  }
} finally {
  await client.end();
}
