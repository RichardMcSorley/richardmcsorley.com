import moment from "moment";

export default function DateFormater({ dateString }) {
    const date = moment(dateString);
    const dayNumber = date.format("DD");
    const day = date.localeData().ordinal(dayNumber);
    return (
        <time dateTime={date.toString()}>{`${date.format("MMMM")} ${day} ${date.format('YYYY')}`}</time>
    );
}
