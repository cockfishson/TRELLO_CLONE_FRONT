import React from "react";
import * as styles from "./activityLog.css";
import { ActivityLog } from "../../services/api.ts";

const ActivityLogs: React.FC<{
  logs: ActivityLog[];
  isVisible: boolean;
  isLoading: boolean;
}> = ({ logs, isVisible, isLoading }) => {
  if (!isVisible) return null;
  const pfp: string = "../../../media/pfp.jpg";
  return (
    <div className={styles.activityLogContainer}>
      <div className={styles.activityLogHeader}>
        <span>Activity Log</span>
      </div>
      {isLoading ? (
        <p className={styles.loadingText}>Loading logs...</p>
      ) : (
        <ul className={styles.activityLogList}>
          {logs.map((log) => (
            <li key={log.activity_id} className={styles.activityLogItem}>
              <img className={styles.pfp} src={pfp} alt="profile picture" />
              <div className={styles.textWrap}>
                <p className={styles.userNameLine}>
                  {log.user_name_and_surname}
                </p>
                <p className={styles.actionDetails}>{log.action_details}</p>
                <p className={styles.activityLogDate}>
                  {new Date(log.created_at).toLocaleString()}
                </p>{" "}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ActivityLogs;
