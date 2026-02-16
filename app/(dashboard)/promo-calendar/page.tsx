"use client"

import { useState } from "react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  DollarSign,
  ClipboardList,
  CheckCircle,
  Download,
  Plus,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react"

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const periods = [
  { id: "P01", label: "P01", month: "Jan" },
  { id: "P02", label: "P02", month: "Feb" },
  { id: "P03", label: "P03", month: "Mar" },
  { id: "P04", label: "P04", month: "Apr" },
]

type PromoType = "MCB" | "Scan" | "OI" | "Passport" | "Slotting"

const promoTypeColors: Record<PromoType, string> = {
  MCB: "bg-[#6C12ED]",
  Scan: "bg-[#0EA5E9]",
  OI: "bg-[#F59E0B]",
  Passport: "bg-[#92700C]",
  Slotting: "bg-[#EF4444]",
}

interface PromoEvent {
  id: string
  name: string
  type: PromoType
  startPeriod: number
  spanPeriods: number
}

interface RetailerRow {
  name: string
  planned: string
  promos: PromoEvent[]
}

const retailerData: RetailerRow[] = [
  {
    name: "WHOLE FOODS",
    planned: "$48.2K planned",
    promos: [
      { id: "wf-1", name: "Q1 MCB 15%", type: "MCB", startPeriod: 0, spanPeriods: 2.7 },
      { id: "wf-2", name: "2/$5 Spring", type: "Scan", startPeriod: 1, spanPeriods: 1 },
      { id: "wf-3", name: "15% OI", type: "OI", startPeriod: 1.3, spanPeriods: 1.7 },
      { id: "wf-4", name: "Slotting - 6 SKUs", type: "Slotting", startPeriod: 2, spanPeriods: 1 },
      { id: "wf-5", name: "15% OI", type: "OI", startPeriod: 3, spanPeriods: 1 },
    ],
  },
  {
    name: "BRISTOL FARMS",
    planned: "$22.4K planned",
    promos: [
      { id: "bf-1", name: "$0.38 Scan + $1.3K Ad", type: "Scan", startPeriod: 0, spanPeriods: 1 },
      { id: "bf-2", name: "Passport", type: "Passport", startPeriod: 2, spanPeriods: 2 },
    ],
  },
  {
    name: "WAKEFERN",
    planned: "$18.6K planned",
    promos: [
      { id: "wk-1", name: "3/$5 Scan", type: "Scan", startPeriod: 0, spanPeriods: 1 },
      { id: "wk-2", name: "2/$4 Scan", type: "Scan", startPeriod: 2, spanPeriods: 1 },
    ],
  },
  {
    name: "STOP AND SHOP",
    planned: "",
    promos: [],
  },
  {
    name: "KROGER",
    planned: "",
    promos: [],
  },
]

const periodTotals = [
  { id: "P01", value: "$62.4K", highlight: false },
  { id: "P02", value: "$48.1K", highlight: false },
  { id: "P03", value: "$71.8K", highlight: true },
  { id: "P04", value: "$38.2K", highlight: false },
]

const templates = [
  { id: "blank", label: "Blank" },
  { id: "wf-standard", label: "Whole Foods Standard (Scan + Ad + Display)" },
  { id: "bf-passport", label: "Bristol Farms Passport (Scan + Ad)" },
  { id: "unfi-mcb", label: "UNFI MCB (15% OI)" },
  { id: "dsd-scan", label: "DSD 2/$4 Scan" },
]

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function PromoCalendarPage() {
  const [quarterFilter, setQuarterFilter] = useState("Q1 2026")
  const [retailerFilter, setRetailerFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [viewMode, setViewMode] = useState<"Month" | "Quarter" | "Year">("Quarter")
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [selectedTemplate, setSelectedTemplate] = useState("blank")
  const [modalRetailer, setModalRetailer] = useState("")
  const [modalDistributor, setModalDistributor] = useState("")
  const [modalStartDate, setModalStartDate] = useState("")
  const [modalEndDate, setModalEndDate] = useState("")
  const [modalDescription, setModalDescription] = useState("")
  const [modalNotes, setModalNotes] = useState("")
  const [fundingLines, setFundingLines] = useState([{ type: "Scan", amount: "", unit: "Per Case" }])
  const [showVolume, setShowVolume] = useState(false)

  const addFundingLine = () => setFundingLines([...fundingLines, { type: "Scan", amount: "", unit: "Per Case" }])
  const removeFundingLine = (i: number) => setFundingLines(fundingLines.filter((_, idx) => idx !== i))
  const resetModal = () => {
    setSelectedTemplate("blank")
    setModalRetailer("")
    setModalDistributor("")
    setModalStartDate("")
    setModalEndDate("")
    setModalDescription("")
    setModalNotes("")
    setFundingLines([{ type: "Scan", amount: "", unit: "Per Case" }])
    setShowVolume(false)
  }

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Promo Calendar</h2>
          <p className="text-sm text-gray-400 mt-1">Plan promotions by retailer. Compare scenarios before committing.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="border-gray-700 bg-transparent text-gray-300 hover:bg-gray-800 hover:text-white">
            <Download className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button size="sm" className="bg-[#6C12ED] hover:bg-[#5A0ECB] text-white" onClick={() => { resetModal(); setIsModalOpen(true) }}>
            <Plus className="h-4 w-4 mr-2" />
            Plan Promo
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <SummaryCard label="TOTAL PROMO BUDGET" value="$280.0K" sub="8 promos across 3 retailers" icon={<DollarSign className="h-4 w-4 text-gray-500" />} />
        <SummaryCard label="COMMITTED SPEND" value="$140.3K" sub="50% of budget &middot; On track for Q1" subColor="text-green-400" icon={<DollarSign className="h-4 w-4 text-gray-500" />} />
        <SummaryCard label="EXPECTED DEDUCTIONS" value="$83.0K" sub="Based on promo agreements" icon={<ClipboardList className="h-4 w-4 text-gray-500" />} />
        <SummaryCard label="ACTUAL DEDUCTIONS" value="$57.9K" sub="Deductions received to date" icon={<DollarSign className="h-4 w-4 text-gray-500" />} />
        <SummaryCard label="NET VARIANCE" value="-$25,100" valueColor="text-green-400" sub="Under expected deductions" subColor="text-green-400" icon={<CheckCircle className="h-4 w-4 text-green-400" />} />
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <Select value={quarterFilter} onValueChange={setQuarterFilter}>
            <SelectTrigger className="w-[130px] bg-gray-900 border-gray-700 text-gray-200 text-sm"><SelectValue /></SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-700">
              <SelectItem value="Q1 2026">Q1 2026</SelectItem>
              <SelectItem value="Q2 2026">Q2 2026</SelectItem>
              <SelectItem value="Q3 2026">Q3 2026</SelectItem>
              <SelectItem value="Q4 2026">Q4 2026</SelectItem>
            </SelectContent>
          </Select>
          <Select value={retailerFilter} onValueChange={setRetailerFilter}>
            <SelectTrigger className="w-[150px] bg-gray-900 border-gray-700 text-gray-200 text-sm"><SelectValue placeholder="All Retailers" /></SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-700">
              <SelectItem value="all">All Retailers</SelectItem>
              <SelectItem value="whole-foods">Whole Foods</SelectItem>
              <SelectItem value="bristol-farms">Bristol Farms</SelectItem>
              <SelectItem value="wakefern">Wakefern</SelectItem>
              <SelectItem value="stop-and-shop">Stop and Shop</SelectItem>
              <SelectItem value="kroger">Kroger</SelectItem>
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[130px] bg-gray-900 border-gray-700 text-gray-200 text-sm"><SelectValue placeholder="All Types" /></SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-700">
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="MCB">MCB</SelectItem>
              <SelectItem value="Scan">Scan</SelectItem>
              <SelectItem value="OI">OI</SelectItem>
              <SelectItem value="Passport">Passport</SelectItem>
              <SelectItem value="Slotting">Slotting</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center bg-gray-900 border border-gray-700 rounded-md overflow-hidden">
          {(["Month", "Quarter", "Year"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-4 py-1.5 text-sm font-medium transition-colors ${viewMode === mode ? "bg-[#6C12ED] text-white" : "text-gray-400 hover:text-white hover:bg-gray-800"}`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 text-xs text-gray-400">
        {([
          ["#6C12ED", "MCB"],
          ["#0EA5E9", "Scan / Scan-Back"],
          ["#F59E0B", "OI (Off-Invoice)"],
          ["#92700C", "Passport / Program"],
          ["#EF4444", "Slotting"],
        ] as const).map(([color, label]) => (
          <div key={label} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: color }} />
            <span>{label}</span>
          </div>
        ))}
      </div>

      {/* Gantt Calendar Grid */}
      <Card className="bg-gray-900 border-gray-800 overflow-hidden">
        <CardContent className="p-0">
          {/* Period Headers */}
          <div className="grid grid-cols-[220px_1fr] border-b border-gray-800">
            <div className="bg-gray-900 border-r border-gray-800 px-4 py-3">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Retailer</span>
            </div>
            <div className="grid grid-cols-4">
              {periods.map((p) => (
                <div key={p.id} className="px-4 py-3 border-r border-gray-800 last:border-r-0 text-center">
                  <span className="text-xs font-semibold text-gray-300">{p.label}</span>
                  <span className="text-xs text-gray-500 ml-1.5">({p.month})</span>
                </div>
              ))}
            </div>
          </div>

          {/* Retailer Rows */}
          {retailerData.map((retailer, rIdx) => {
            const promoRows: PromoEvent[][] = []
            retailer.promos.forEach((promo) => {
              let placed = false
              for (const row of promoRows) {
                const overlaps = row.some(
                  (ex) => promo.startPeriod < ex.startPeriod + ex.spanPeriods && promo.startPeriod + promo.spanPeriods > ex.startPeriod
                )
                if (!overlaps) { row.push(promo); placed = true; break }
              }
              if (!placed) promoRows.push([promo])
            })

            const rowHeight = promoRows.length > 0 ? Math.max(promoRows.length * 36 + 16, 60) : 60

            return (
              <div
                key={retailer.name}
                className={`grid grid-cols-[220px_1fr] ${rIdx < retailerData.length - 1 ? "border-b border-gray-800" : ""}`}
                style={{ minHeight: rowHeight }}
              >
                {/* Retailer Name */}
                <div className="flex flex-col justify-center px-4 border-r border-gray-800 bg-gray-900/50">
                  <span className="text-sm font-semibold text-white tracking-wide">{retailer.name}</span>
                  {retailer.planned ? (
                    <span className="text-xs text-gray-500 mt-0.5">{retailer.planned}</span>
                  ) : null}
                </div>

                {/* Gantt area */}
                <div className="relative" style={{ minHeight: rowHeight }}>
                  <div className="absolute inset-0 grid grid-cols-4 pointer-events-none">
                    {periods.map((_, i) => (
                      <div key={i} className={`${i < 3 ? "border-r border-gray-800/50" : ""}`} />
                    ))}
                  </div>

                  {retailer.promos.length === 0 ? (
                    <div className="flex items-center justify-center h-full gap-2">
                      <span className="text-sm text-gray-600 italic">No promos planned</span>
                      <button
                        onClick={() => { resetModal(); setModalRetailer(retailer.name.toLowerCase().replace(/ /g, "-")); setIsModalOpen(true) }}
                        className="text-sm font-medium text-[#6C12ED] hover:text-[#8B3FF5] transition-colors"
                      >
                        + Plan Promo
                      </button>
                    </div>
                  ) : (
                    <div className="relative px-1 py-2" style={{ minHeight: rowHeight - 4 }}>
                      {promoRows.map((row, rowIndex) =>
                        row.map((promo) => {
                          const leftPercent = (promo.startPeriod / 4) * 100
                          const widthPercent = (promo.spanPeriods / 4) * 100
                          const topPx = rowIndex * 36

                          return (
                            <Tooltip key={promo.id}>
                              <TooltipTrigger asChild>
                                <div
                                  className={`absolute h-[28px] ${promoTypeColors[promo.type]} rounded flex items-center px-2.5 cursor-pointer hover:brightness-110 transition-all`}
                                  style={{ left: `${leftPercent}%`, width: `${widthPercent}%`, top: `${topPx + 8}px` }}
                                >
                                  <span className="text-xs font-medium text-white truncate">{promo.name}</span>
                                </div>
                              </TooltipTrigger>
                              <TooltipContent className="bg-gray-800 border-gray-700">
                                <div className="text-sm">
                                  <p className="font-semibold">{promo.name}</p>
                                  <p className="text-gray-400">Type: {promo.type}</p>
                                  <p className="text-gray-400">
                                    {periods[Math.floor(promo.startPeriod)]?.month ?? "Jan"} &ndash;{" "}
                                    {periods[Math.min(Math.floor(promo.startPeriod + promo.spanPeriods - 0.1), 3)]?.month ?? "Apr"}
                                  </p>
                                </div>
                              </TooltipContent>
                            </Tooltip>
                          )
                        })
                      )}
                    </div>
                  )}
                </div>
              </div>
            )
          })}

          {/* Period Totals Row */}
          <div className="grid grid-cols-[220px_1fr] border-t-2 border-gray-700 bg-gray-950/60">
            <div className="flex items-center px-4 py-3 border-r border-gray-800">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Spend</span>
            </div>
            <div className="grid grid-cols-4">
              {periodTotals.map((pt) => (
                <div key={pt.id} className="flex items-center justify-center px-4 py-3 border-r border-gray-800 last:border-r-0">
                  <span className={`text-sm font-bold ${pt.highlight ? "text-amber-400" : "text-gray-300"}`}>
                    {pt.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Plan Promo Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-gray-900 border-gray-800 text-gray-50 max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white">Plan Promo</DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-2">
            {/* Template */}
            <section>
              <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 block">Template (Optional)</Label>
              <RadioGroup value={selectedTemplate} onValueChange={setSelectedTemplate} className="space-y-2">
                {templates.map((t) => (
                  <div key={t.id} className="flex items-center gap-3">
                    <RadioGroupItem value={t.id} id={t.id} className="border-gray-600 text-[#6C12ED] data-[state=checked]:bg-[#6C12ED] data-[state=checked]:border-[#6C12ED]" />
                    <Label htmlFor={t.id} className="text-sm text-gray-300 cursor-pointer font-normal">{t.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </section>

            <div className="border-t border-gray-800" />

            {/* Account */}
            <section>
              <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 block">Account</Label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-gray-400 mb-1.5 block">Retailer <span className="text-red-400">*</span></Label>
                  <Select value={modalRetailer} onValueChange={setModalRetailer}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-gray-200"><SelectValue placeholder="Select retailer..." /></SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="whole-foods">Whole Foods</SelectItem>
                      <SelectItem value="bristol-farms">Bristol Farms</SelectItem>
                      <SelectItem value="wakefern">Wakefern</SelectItem>
                      <SelectItem value="stop-and-shop">Stop and Shop</SelectItem>
                      <SelectItem value="kroger">Kroger</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs text-gray-400 mb-1.5 block">Distributor <span className="text-red-400">*</span></Label>
                  <Select value={modalDistributor} onValueChange={setModalDistributor}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-gray-200"><SelectValue placeholder="Select distributor..." /></SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="unfi">UNFI</SelectItem>
                      <SelectItem value="kehe">KeHE</SelectItem>
                      <SelectItem value="dsd">DSD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </section>

            <div className="border-t border-gray-800" />

            {/* Timing */}
            <section>
              <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 block">Timing</Label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-gray-400 mb-1.5 block">Start Date <span className="text-red-400">*</span></Label>
                  <Input type="date" value={modalStartDate} onChange={(e) => setModalStartDate(e.target.value)} className="bg-gray-800 border-gray-700 text-gray-200" />
                </div>
                <div>
                  <Label className="text-xs text-gray-400 mb-1.5 block">End Date <span className="text-red-400">*</span></Label>
                  <Input type="date" value={modalEndDate} onChange={(e) => setModalEndDate(e.target.value)} className="bg-gray-800 border-gray-700 text-gray-200" />
                </div>
              </div>
            </section>

            <div className="border-t border-gray-800" />

            {/* Offer Description */}
            <section>
              <Label className="text-xs text-gray-400 mb-1.5 block">Offer Description <span className="text-red-400">*</span></Label>
              <Input value={modalDescription} onChange={(e) => setModalDescription(e.target.value)} placeholder="e.g., 2/$5 Spring Promo" className="bg-gray-800 border-gray-700 text-gray-200 placeholder:text-gray-600" />
            </section>

            <div className="border-t border-gray-800" />

            {/* Funding */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Funding</Label>
                <button onClick={addFundingLine} className="text-xs font-medium text-[#6C12ED] hover:text-[#8B3FF5] transition-colors">+ Add Line</button>
              </div>
              <div className="space-y-3">
                {fundingLines.map((line, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Select value={line.type} onValueChange={(val) => { const u = [...fundingLines]; u[index].type = val; setFundingLines(u) }}>
                      <SelectTrigger className="w-[120px] bg-gray-800 border-gray-700 text-gray-200 text-sm"><SelectValue /></SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="Scan">Scan</SelectItem>
                        <SelectItem value="OI">OI</SelectItem>
                        <SelectItem value="MCB">MCB</SelectItem>
                        <SelectItem value="Ad">Ad</SelectItem>
                        <SelectItem value="Slotting">Slotting</SelectItem>
                        <SelectItem value="Display">Display</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input type="number" step="0.01" value={line.amount} onChange={(e) => { const u = [...fundingLines]; u[index].amount = e.target.value; setFundingLines(u) }} placeholder="0.00" className="w-[100px] bg-gray-800 border-gray-700 text-gray-200 text-sm" />
                    <Select value={line.unit} onValueChange={(val) => { const u = [...fundingLines]; u[index].unit = val; setFundingLines(u) }}>
                      <SelectTrigger className="w-[140px] bg-gray-800 border-gray-700 text-gray-200 text-sm"><SelectValue /></SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="Per Case">Per Case</SelectItem>
                        <SelectItem value="Per Unit">Per Unit</SelectItem>
                        <SelectItem value="Flat Fee">Flat Fee</SelectItem>
                        <SelectItem value="% of Invoice">% of Invoice</SelectItem>
                      </SelectContent>
                    </Select>
                    {fundingLines.length > 1 && (
                      <button onClick={() => removeFundingLine(index)} className="text-gray-500 hover:text-red-400 transition-colors">
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <div className="border-t border-gray-800" />

            {/* Volume & Scenarios */}
            <section>
              <button onClick={() => setShowVolume(!showVolume)} className="flex items-center justify-between w-full text-left">
                <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer">Volume & Scenarios (Optional)</Label>
                {showVolume ? <ChevronUp className="h-4 w-4 text-gray-500" /> : <ChevronDown className="h-4 w-4 text-gray-500" />}
              </button>
              {showVolume && (
                <div className="mt-3 p-4 bg-gray-800/50 rounded-lg border border-gray-800">
                  <p className="text-sm text-gray-500">Enter projected volume to calculate costs.</p>
                  <div className="grid grid-cols-2 gap-4 mt-3">
                    <div>
                      <Label className="text-xs text-gray-400 mb-1.5 block">Projected Volume (cases)</Label>
                      <Input type="number" placeholder="0" className="bg-gray-800 border-gray-700 text-gray-200" />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-400 mb-1.5 block">Price per Case</Label>
                      <Input type="number" step="0.01" placeholder="0.00" className="bg-gray-800 border-gray-700 text-gray-200" />
                    </div>
                  </div>
                </div>
              )}
            </section>

            <div className="border-t border-gray-800" />

            {/* Notes */}
            <section>
              <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 block">Notes</Label>
              <Textarea value={modalNotes} onChange={(e) => setModalNotes(e.target.value)} placeholder="e.g., Part of Passport to Savings program..." className="bg-gray-800 border-gray-700 text-gray-200 placeholder:text-gray-600 min-h-[80px]" />
            </section>
          </div>

          <DialogFooter className="gap-3 pt-2">
            <Button variant="outline" onClick={() => setIsModalOpen(false)} className="border-gray-700 bg-transparent text-gray-300 hover:bg-gray-800 hover:text-white">Cancel</Button>
            <Button onClick={() => setIsModalOpen(false)} className="bg-[#6C12ED] hover:bg-[#5A0ECB] text-white">Add to Calendar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function SummaryCard({
  label, value, sub, icon, valueColor = "text-white", subColor = "text-gray-500",
}: {
  label: string; value: string; sub: string; icon: React.ReactNode; valueColor?: string; subColor?: string
}) {
  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider leading-tight">{label}</span>
          {icon}
        </div>
        <div className={`text-xl font-bold ${valueColor} tracking-tight`}>{value}</div>
        <p className={`text-xs mt-0.5 ${subColor}`}>{sub}</p>
      </CardContent>
    </Card>
  )
}
