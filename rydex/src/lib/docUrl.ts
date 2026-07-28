// Cloudinary refuses to deliver PDFs directly (401 "deny or ACL failure" unless
// PDF delivery is enabled on the account), so PDF documents are always viewed
// through per-page JPEG derivatives instead of the raw file.
export const isPdfUrl = (url?: string | null) => /\.pdf$/i.test(url || "");

export const isCloudinaryPdf = (url?: string | null) =>
  isPdfUrl(url) && !!url?.includes("/upload/");

export const pdfPageUrl = (url: string, page: number, width: number) =>
  url
    .replace("/upload/", `/upload/pg_${page},f_jpg,w_${width},q_auto/`)
    .replace(/\.pdf$/i, ".jpg");

export const DOC_TYPES = {
  aadhar: { label: "Aadhaar", field: "aadharUrl" },
  license: { label: "Driving License", field: "licenseUrl" },
  rc: { label: "Registration Certificate", field: "rcUrl" },
} as const;

export type DocType = keyof typeof DOC_TYPES;
