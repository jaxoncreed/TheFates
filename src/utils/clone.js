// TODO: This isn't a very elegant clone
export default function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}
