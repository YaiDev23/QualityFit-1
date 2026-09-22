import{a as S,c as _,f as g}from"./chunk-OVJLP7DY.js";import{L as w,Pb as c,Q as E}from"./chunk-HC5KGLIC.js";import{e as r}from"./chunk-YMDWBF3A.js";var O=class o{db=E(c);getOrCreateSession(e,t){return r(this,null,function*(){let s=yield this.db.queryOne("SELECT * FROM workout_session WHERE date = ?;",[e]);if(s)return s;yield this.db.run(`INSERT INTO workout_session (date, day_of_week, routine_id, started_at)
       VALUES (?, ?, ?, ?);`,[e,_(S(e)),t,new Date().toISOString()]);let n=yield this.db.queryOne("SELECT * FROM workout_session WHERE date = ?;",[e]);if(!n)throw new Error("No se pudo crear la sesion de entrenamiento.");return n})}getSession(e){return r(this,null,function*(){return this.db.queryOne("SELECT * FROM workout_session WHERE date = ?;",[e])})}setsForDate(e){return r(this,null,function*(){return this.db.query(`SELECT sl.*, e.name AS exercise_name, e.muscle_group
       FROM set_log sl
       JOIN workout_session ws ON ws.id = sl.session_id
       JOIN exercise e ON e.id = sl.exercise_id
       WHERE ws.date = ?
       ORDER BY sl.exercise_id, sl.set_number;`,[e])})}logSet(e){return r(this,null,function*(){let t=yield this.getOrCreateSession(e.date,e.routineId),{lastId:s}=yield this.db.run(`INSERT INTO set_log
         (session_id, exercise_id, routine_item_id, set_number, reps, weight, logged_at)
       VALUES (?, ?, ?, ?, ?, ?, ?);`,[t.id,e.exerciseId,e.routineItemId,e.setNumber,e.reps,e.weight,new Date().toISOString()]);return s})}updateSet(e,t,s){return r(this,null,function*(){yield this.db.run("UPDATE set_log SET reps = ?, weight = ? WHERE id = ?;",[t,s,e])})}deleteSet(e){return r(this,null,function*(){yield this.db.run("DELETE FROM set_log WHERE id = ?;",[e])})}finishSession(e){return r(this,null,function*(){yield this.db.run("UPDATE workout_session SET finished_at = ? WHERE date = ?;",[new Date().toISOString(),e])})}lastPerformance(e,t){return r(this,null,function*(){let s=yield this.db.queryOne(`SELECT ws.date
       FROM set_log sl
       JOIN workout_session ws ON ws.id = sl.session_id
       WHERE sl.exercise_id = ? AND ws.date < ?
       ORDER BY ws.date DESC
       LIMIT 1;`,[e,t]);if(!s)return null;let n=yield this.db.query(`SELECT sl.*
       FROM set_log sl
       JOIN workout_session ws ON ws.id = sl.session_id
       WHERE sl.exercise_id = ? AND ws.date = ?
       ORDER BY sl.set_number;`,[e,s.date]);return{date:s.date,sets:n}})}weekSummary(e,t){return r(this,null,function*(){let s=g(e),n=t?yield this.db.query(`SELECT day_of_week,
                  COUNT(*)          AS exercises,
                  SUM(target_sets)  AS sets
           FROM routine_item
           WHERE routine_id = ?
           GROUP BY day_of_week;`,[t]):[],b=yield this.db.query(`SELECT ws.date                       AS date,
              COUNT(sl.id)                  AS sets,
              COALESCE(SUM(sl.reps * sl.weight), 0) AS volume
       FROM workout_session ws
       LEFT JOIN set_log sl ON sl.session_id = ws.id
       WHERE ws.date BETWEEN ? AND ?
       GROUP BY ws.date;`,[s[0],s[6]]),y=new Map(n.map(i=>[i.day_of_week,i])),R=new Map(b.map(i=>[i.date,i]));return s.map((i,f)=>{let u=f+1,l=y.get(u),m=R.get(i),a=l?.sets??0,d=m?.sets??0;return{day_of_week:u,date:i,planned_exercises:l?.exercises??0,planned_sets:a,logged_sets:d,volume:m?.volume??0,started:d>0,complete:a>0&&d>=a}})})}static \u0275fac=function(t){return new(t||o)};static \u0275prov=w({token:o,factory:o.\u0275fac,providedIn:"root"})};export{O as a};
