import { B as F, C as e, D as A, _ as a, E as $, F as P, G as S, H as O, J as v, K as G, L as U, M as C, N as D, P as R, O as x, Q as b, T as B, V as q, W as H, s as J, X as V, Y as z, Z as K, $ as Q, a0 as W, a1 as X, a2 as Y } from "./indexWPE-BtdRdhev.js";
import { E as Z } from "./ExcludeFiles-Z4h0r6JV.js";
const ee = "_options_1cx9x_1", ie = "_option_1cx9x_1", l = {
  options: ee,
  option: ie,
  "option-label": "_option-label_1cx9x_19 _text-base_iyx6q_21 _font-medium_iyx6q_5",
  "option-description": "_option-description_1cx9x_24 _text-sm_iyx6q_15 _font-regular_iyx6q_1",
  "option-chip": "_option-chip_1cx9x_29",
  "option-datepicker": "_option-datepicker_1cx9x_33",
  "radio-wrapper": "_radio-wrapper_1cx9x_37",
  "radio-input": "_radio-input_1cx9x_43 _sr-only_1wbb8_96 _sr-only_e5q2n_4"
}, te = (i) => ({
  media_files: i.media_files
}), ae = ({ media_files: i, updateMFDate: t }) => {
  const s = i.date;
  let o;
  return !s || s === "" ? o = /* @__PURE__ */ new Date() : o = new Date(s), /* @__PURE__ */ e.jsx(
    A,
    {
      name: "media-since-date-time",
      type: "datetime-local",
      value: $(o),
      onChange: (n) => {
        t(new Date(n.target.value).toISOString());
      },
      additionalAttributes: {
        "aria-label": a(
          "Upload media that were added or updated after date and time",
          "wp-migrate-db"
        )
      }
    }
  );
}, se = F(te, { updateMFDate: P })(ae), ne = {
  "summary-details": "_summary-details_plc85_1 _text-sm_iyx6q_15 _font-regular_iyx6q_1"
}, oe = () => {
  const i = S((r) => r.media_files), { option: t, last_migration: s, date: o } = i, n = a(
    "since the beginning of time will be migrated",
    "wp-migrate-db"
  ), c = {
    new_subsequent: s ? O(
      a("since %s will be migrated", "wp-migrate-db"),
      v(s)
    ) : n,
    new: o ? O(
      a("since %s will be migrated", "wp-migrate-db"),
      v(o)
    ) : n,
    all: n
  };
  return /* @__PURE__ */ e.jsx("div", { className: ne["summary-details"], children: c[t] || n });
}, le = (i) => {
  const t = i.profiles.profile_loading, s = G("panelsOpen", i), o = U("status", i), { loaded_profile: n } = i.profiles;
  return {
    isLoading: t,
    panel_info: i.panels,
    migration: i.migrations,
    current_migration: i.migrations.current_migration,
    addons: i.addons,
    media_files: i.media_files,
    status: o,
    panelsOpen: s,
    loaded_profile: n
  };
}, re = {
  pull: a("Pull", "wp-migrate-db"),
  push: a("Push", "wp-migrate-db"),
  savefile: a("Export", "wp-migrate-db")
}, de = (i) => {
  const { selected: t, labelledby: s } = i;
  return /* @__PURE__ */ e.jsxs("div", { className: l["radio-wrapper"], children: [
    /* @__PURE__ */ e.jsx(
      "div",
      {
        className: Q.control,
        "aria-hidden": "true",
        "data-state": t ? "checked" : "unchecked"
      }
    ),
    /* @__PURE__ */ e.jsx(
      "input",
      {
        className: l["radio-input"],
        type: "radio",
        name: "media-option",
        checked: t,
        "aria-labelledby": s,
        readOnly: !0
      }
    )
  ] });
}, N = (i) => {
  const {
    description: t,
    currentOption: s,
    intent: o,
    optionName: n,
    postDescription: c,
    className: r,
    label: m
  } = i, g = C(), _ = (f) => {
    if (s === f)
      return null;
    g(i.setMediaOption(f));
  }, d = `media-${n}`;
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    /* @__PURE__ */ e.jsxs(
      "div",
      {
        onClick: () => {
          _(n);
        },
        className: `${l.option} ${r || ""}`,
        children: [
          /* @__PURE__ */ e.jsx(
            de,
            {
              labelledby: d,
              selected: n === s
            }
          ),
          /* @__PURE__ */ e.jsxs("div", { children: [
            /* @__PURE__ */ e.jsx("span", { id: d, className: l["option-label"], children: O(m, re[o]) }),
            /* @__PURE__ */ e.jsx("div", { className: l["option-description"], children: t }),
            c && /* @__PURE__ */ e.jsx("div", { className: l["option-chip"], children: /* @__PURE__ */ e.jsx(z, { label: c, size: "sm" }) }),
            /* @__PURE__ */ e.jsx("div", { className: l["option-datepicker"], children: n === "new" && s === "new" && /* @__PURE__ */ e.jsx(se, {}) })
          ] })
        ]
      }
    )
  );
}, ce = (i) => {
  const { media_files: t, panelsOpen: s, status: o, migration: n } = i, { current_migration: c, local_site: r } = n, { intent: m, twoMultisites: g, localSource: _ } = c, { enabled: d } = t, f = C(), w = typeof t.available < "u" && !t.available, E = D(o, {
    name: "MF_INVALID_DATE"
  }), I = D(o, {
    name: "MF_OPTION_NULL"
  }), T = S((p) => p.multisite_tools), k = () => {
    const p = _ && r.is_multisite === "false" || !_ && r.is_multisite === "true";
    return !g && p ? a(
      "Copies all files to the uploads folder of the subsite",
      "wp-migrate-db"
    ) : a(
      "Copies all files from the uploads folder of the subsite",
      "wp-migrate-db"
    );
  }, u = {
    all: a("All uploads", "wp-migrate-db"),
    new: a("New and modified uploads by date", "wp-migrate-db"),
    new_subsequent: a("New and modified uploads", "wp-migrate-db")
  }, h = {
    all: T.enabled ? k() : a("Copies all files from the uploads folder", "wp-migrate-db"),
    new: a(
      "Copies new and modified files after a specific date",
      "wp-migrate-db"
    ),
    new_subsequent: a(
      "Copies new and modified files since the last migration",
      "wp-migrate-db"
    )
  }, L = (p) => !K(s, "media_files") && t.option && t.enabled ? /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    u[t.option],
    /* @__PURE__ */ e.jsx(oe, {})
  ] }) : null, M = s.includes("media_files");
  let j = !1;
  d && !M && (j = !0);
  const y = [];
  return j && y.push("has-divider"), d && y.push("enabled"), /* @__PURE__ */ e.jsx("div", { className: "media-files", children: /* @__PURE__ */ e.jsxs(
    R,
    {
      title: a("Media Uploads", "wp-migrate-db"),
      className: y.join(" "),
      panelName: "media_files",
      disabled: w,
      enabled: d,
      panelSummary: /* @__PURE__ */ e.jsx(L, { disabled: w, labels: u, ...i }),
      forceDivider: j,
      callback: (p) => H(
        p,
        "media_files",
        M,
        d,
        w,
        i.addOpenPanel,
        i.removeOpenPanel,
        () => f(J(V))
      ),
      toggle: q(),
      hasInput: !0,
      children: [
        /* @__PURE__ */ e.jsxs("div", { className: "media-files-inner-wrap", children: [
          /* @__PURE__ */ e.jsxs("div", { className: l.options, children: [
            /* @__PURE__ */ e.jsx(
              N,
              {
                description: h.new_subsequent,
                label: u.new_subsequent,
                postDescription: t.last_migration && t.last_migration !== "" ? v(t.last_migration) : "",
                currentOption: t.option,
                optionName: "new_subsequent",
                intent: m,
                setMediaOption: x
              }
            ),
            /* @__PURE__ */ e.jsx(
              N,
              {
                description: h.all,
                label: u.all,
                currentOption: t.option,
                optionName: "all",
                intent: m,
                setMediaOption: x
              }
            ),
            /* @__PURE__ */ e.jsx(
              N,
              {
                description: h.new,
                label: u.new,
                currentOption: t.option,
                optionName: "new",
                intent: m,
                setMediaOption: x,
                className: "option-wrap"
              }
            )
          ] }),
          /* @__PURE__ */ e.jsx(
            Z,
            {
              ...i,
              excludes: t.excludes,
              excludesUpdater: i.updateMFExcludes,
              type: "media"
            }
          )
        ] }),
        E && /* @__PURE__ */ e.jsx(b, { type: "error", children: /* @__PURE__ */ e.jsx(b.Content, { children: B(
          a(
            'The date selected <a href="https://www.youtube.com/watch?v=G3AfIvJBcGo" target="_blank" rel="noopener noreferrer">is in the future</a>, please select a valid date.',
            "wp-migrate-db"
          )
        ) }) }),
        I && /* @__PURE__ */ e.jsx(b, { type: "error", children: /* @__PURE__ */ e.jsx(b.Content, { children: a("Please select a media option above.", "wp-migrate-db") }) })
      ]
    }
  ) });
}, ue = F(le, {
  toggleMediaFiles: q,
  setMediaOption: x,
  addOpenPanel: Y,
  removeOpenPanel: X,
  updateMFExcludes: W,
  updateMFDate: P
})(ce);
export {
  ue as default
};
//# sourceMappingURL=MediaFiles-BtZaV440.js.map
