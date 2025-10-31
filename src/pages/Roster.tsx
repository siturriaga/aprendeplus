import { useEffect, useMemo, useState } from 'react';
import { useFirebase } from '../providers/FirebaseProvider';
import { useForm } from 'react-hook-form';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { api } from '../lib/api';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Upload, CheckCircle2, FileSpreadsheet } from 'lucide-react';

interface RosterRow {
  id: string;
  name: string;
  period: string;
  quarter: string;
}

export function Roster() {
  const { user } = useFirebase();
  const [step, setStep] = useState<'upload' | 'preview' | 'commit'>('upload');
  const [rows, setRows] = useState<RosterRow[]>([]);
  const [importStats, setImportStats] = useState<{ imported: number; periods: number } | null>(
    null
  );

  const previewByPeriod = useMemo(() => {
    return rows.reduce<Record<string, RosterRow[]>>((acc, row) => {
      acc[row.period] = acc[row.period] ? [...acc[row.period], row] : [row];
      return acc;
    }, {});
  }, [rows]);

  const { register, handleSubmit, reset } = useForm<{ file: FileList }>();

  const parseFile = async (file: File) => {
    if (file.type.includes('csv')) {
      return new Promise<RosterRow[]>((resolve, reject) => {
        Papa.parse(file, {
          header: true,
          complete: (results) => {
            resolve(
              (results.data as any[]).map((row, index) => ({
                id: String(row.id ?? row.ID ?? index),
                name: row.name ?? row.Name ?? row['Student Name'],
                period: String(row.period ?? row.Period ?? row['Class Period'] ?? '1'),
                quarter: String(row.quarter ?? row.Quarter ?? 'Q1')
              }))
            );
          },
          error: (error) => reject(error)
        });
      });
    }

    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const json: any[] = XLSX.utils.sheet_to_json(worksheet);
    return json.map((row, index) => ({
      id: String(row.id ?? row.ID ?? index),
      name: row.name ?? row.Name ?? row['Student Name'],
      period: String(row.period ?? row.Period ?? row['Class Period'] ?? '1'),
      quarter: String(row.quarter ?? row.Quarter ?? 'Q1')
    }));
  };

  const onSubmit = handleSubmit(async (data) => {
    const file = data.file?.[0];
    if (!file) return;
    try {
      const parsed = await parseFile(file);
      setRows(parsed.filter((row) => row.id && row.name));
      setStep('preview');
    } catch (error: any) {
      toast.error(error.message ?? 'Unable to parse file');
    }
  });

  const commitRoster = async () => {
    if (!user) return;
    try {
      const token = await user.getIdToken();
      const response = await api.processRoster({ rows }, token);
      setImportStats(response.stats);
      toast.success('Roster synced ✅');
      setStep('commit');
      reset();
    } catch (error: any) {
      toast.error(error.message ?? 'Unable to sync roster');
    }
  };

  useEffect(() => {
    if (step === 'preview' && !rows.length) {
      setStep('upload');
    }
  }, [step, rows]);

  return (
    <div className="space-y-8">
      <div className="glass-card p-6">
        <h2 className="font-display text-2xl">Roster Manager</h2>
        <p className="mt-2 text-sm text-slate-300">
          Import students via CSV or XLSX. Synapse automatically organizes by
          period and quarter, keeping all performance data in sync.
        </p>
        {step === 'upload' && (
          <form
            className="mt-6 grid gap-4 rounded-3xl border border-dashed border-white/20 p-8 text-center"
            onSubmit={onSubmit}
          >
            <FileSpreadsheet className="mx-auto h-12 w-12 text-gold" />
            <p className="text-lg font-medium">Upload your roster file</p>
            <p className="text-sm text-slate-300">
              Accepted formats: CSV, XLSX. Required columns: Name, ID, Period,
              Quarter.
            </p>
            <input
              type="file"
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              {...register('file', { required: true })}
              className="mx-auto max-w-sm cursor-pointer rounded-2xl bg-white/10 p-3"
            />
            <motion.button
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="mx-auto inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-royal to-gold px-6 py-3 font-semibold text-slate-900 shadow-glass"
            >
              <Upload className="h-4 w-4" />
              Upload & Preview
            </motion.button>
          </form>
        )}

        {step === 'preview' && (
          <div className="mt-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-medium text-white">Preview roster</p>
                <p className="text-sm text-slate-400">
                  {rows.length} students · {Object.keys(previewByPeriod).length} periods
                </p>
              </div>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={commitRoster}
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-royal to-gold px-6 py-3 font-semibold text-slate-900 shadow-glass"
              >
                <CheckCircle2 className="h-4 w-4" /> Sync Roster
              </motion.button>
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              {Object.entries(previewByPeriod).map(([period, roster]) => (
                <div key={period} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <p className="font-semibold text-white">Period {period}</p>
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                    {roster.length} Students
                  </p>
                  <div className="mt-4 max-h-64 overflow-y-auto rounded-2xl bg-slate-950/40">
                    <table className="min-w-full text-left text-sm text-slate-200">
                      <thead className="bg-white/10 text-xs uppercase tracking-wider">
                        <tr>
                          <th className="px-4 py-2">ID</th>
                          <th className="px-4 py-2">Name</th>
                          <th className="px-4 py-2">Quarter</th>
                        </tr>
                      </thead>
                      <tbody>
                        {roster.map((row) => (
                          <tr key={row.id} className="odd:bg-white/5">
                            <td className="px-4 py-2 text-slate-300">{row.id}</td>
                            <td className="px-4 py-2 text-white">{row.name}</td>
                            <td className="px-4 py-2 text-slate-300">{row.quarter}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 'commit' && importStats && (
          <div className="mt-10 rounded-3xl border border-emerald-400/30 bg-emerald-500/10 p-6 text-emerald-200">
            <h3 className="text-xl font-semibold">Roster synced ✅</h3>
            <p className="mt-2 text-sm">
              {importStats.imported} students across {importStats.periods} periods are now live and updating dashboards.
            </p>
            <button
              onClick={() => {
                setStep('upload');
                setRows([]);
                setImportStats(null);
              }}
              className="mt-4 text-sm font-medium text-emerald-100 underline"
            >
              Import another roster
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
