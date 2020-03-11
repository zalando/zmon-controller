package org.zalando.zmon.domain;

import org.springframework.beans.BeanUtils;

public class AlertCommentAuth extends AlertCommentImport {

    private boolean deletable;

    public boolean isDeletable() {
        return deletable;
    }

    public void setDeletable(final boolean deletable) {
        this.deletable = deletable;
    }

    @Override
    public String toString() {
        final StringBuilder builder = new StringBuilder();
        builder.append("DashboardAuth [deletable=");
        builder.append(deletable);
        builder.append(", DashboardImport=");
        builder.append(super.toString());
        builder.append("]");
        return builder.toString();
    }

    public static AlertCommentAuth from(final AlertCommentImport comment, final boolean deletable) {

        AlertCommentAuth result = null;
        if (comment != null) {
            result = new AlertCommentAuth();

            BeanUtils.copyProperties(comment, result);
            result.setDeletable(deletable);
        }

        return result;
    }

}
